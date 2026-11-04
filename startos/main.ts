import { T } from '@start9labs/start-sdk'
import { mkdir } from 'fs/promises'
import { secretsEnv } from './fileModels/secrets.env'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { current } from './versions/current'
import {
  adminUser,
  lightningId,
  lndGrpcBridge,
  mnt,
  nodeId,
  nodeRpcBridge,
  ports,
  roblosatsEnv,
  uiPort,
} from './utils'

const ok = { result: 'success' as const, message: null }
const packageVersion = current.options.version

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Roblosats Coordinator'))

  // Every service runs in this one network namespace and talks on 127.0.0.1, as the Umbrel app
  // does inside its tor container's namespace.
  for (const d of ['tor', 'panel', 'static']) {
    await mkdir(sdk.volumes.main.subpath(d), { recursive: true })
  }

  const secrets = await secretsEnv.read().once()
  if (!secrets) throw new Error(i18n('The service has not been set up yet'))

  // nginx checks the interface's login too (see nginx.conf): StartOS's proxy enforces it on every
  // address but the plain one on the internal bridge.
  const basic = Buffer.from(`${adminUser}:${secrets.ADMIN_PASSWORD}`).toString(
    'base64',
  )
  await sdk.volumes.main.writeFile(
    'nginx-auth.conf',
    `map $http_authorization $roblosats_login {\n  default 0;\n  "Basic ${basic}" 1;\n}\n`,
  )

  // Lightning Fork's gRPC on StartOS's bridge: null until its wallet is unlocked; main runs
  // again when it appears, and run.sh waits meanwhile. LND's certificate names the address.
  const lndGrpc = (await lndGrpcBridge(effects)) ?? ''
  const nodeRpc = (await nodeRpcBridge(effects)) ?? ''

  const coordinatorMounts = sdk.Mounts.of()
    .mountAssets({ subpath: null, mountpoint: mnt.assets })
    .mountVolume({
      volumeId: 'main',
      subpath: 'panel',
      mountpoint: mnt.panel,
      readonly: false,
    })
    .mountVolume({
      volumeId: 'main',
      subpath: 'tor',
      mountpoint: mnt.tor,
      readonly: true,
    })
    .mountVolume({
      volumeId: 'main',
      subpath: 'static',
      mountpoint: mnt.static,
      readonly: false,
    })
    .mountDependency<T.SDKManifest>({
      dependencyId: lightningId,
      volumeId: 'main',
      subpath: null,
      mountpoint: mnt.lnd,
      readonly: true,
    })
    .mountDependency<T.SDKManifest>({
      // For the RPC cookie (node-rpc.py).
      dependencyId: nodeId,
      volumeId: 'main',
      subpath: null,
      mountpoint: mnt.bitcoind,
      readonly: true,
    })

  // One subcontainer per service, as one container per service on Umbrel: the image's
  // entrypoint rewrites files under /usr/src/robosats on every start.
  const coordinator = (name: string) =>
    sdk.SubContainer.of(
      effects,
      { imageId: 'roblosats' },
      coordinatorMounts,
      name,
    )

  const env = {
    ...roblosatsEnv,
    SECRET_KEY: secrets.SECRET_KEY,
    POSTGRES_PASSWORD: secrets.POSTGRES_PASSWORD,
    NOSTR_NSEC: secrets.NOSTR_NSEC,
    LND_GRPC_HOST: lndGrpc,
  }
  const run = (command: string[]) =>
    ['/startos/run.sh', ...command] as [string, ...string[]]

  const robosatsSub = await coordinator('robosats')
  const torSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'tor' },
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'main',
        subpath: 'tor',
        mountpoint: '/var/lib/tor',
        readonly: false,
      })
      .mountAssets({
        subpath: 'torrc',
        mountpoint: '/etc/tor/torrc',
        type: 'file',
      }),
    'tor',
  )
  const postgresSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'postgres' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'db',
      subpath: null,
      mountpoint: '/var/lib/postgresql/data',
      readonly: false,
    }),
    'postgres',
  )

  const background = (id: string) => ({
    ready: { display: null, fn: () => ok },
    requires: ['postgres', 'redis', 'tor'] as ('postgres' | 'redis' | 'tor')[],
    id,
  })

  let daemons = sdk.Daemons.of(effects)
    .addDaemon('tor', {
      subcontainer: torSub,
      exec: { command: sdk.useEntrypoint() },
      ready: {
        display: i18n('Tor'),
        gracePeriod: 60_000,
        fn: async () => {
          const res = await torSub.exec([
            'test',
            '-s',
            '/var/lib/tor/coordinator/hostname',
          ])
          if (res.exitCode !== 0)
            return {
              result: 'starting',
              message: i18n("Creating the coordinator's onion"),
            }
          return sdk.healthCheck.checkPortListening(effects, ports.socks, {
            successMessage: i18n("The coordinator's onion is ready"),
            errorMessage: i18n('Tor is not running'),
          })
        },
      },
      requires: [],
    })
    .addDaemon('postgres', {
      subcontainer: postgresSub,
      exec: {
        command: sdk.useEntrypoint([
          'postgres',
          '-c',
          'listen_addresses=127.0.0.1',
        ]),
        env: {
          POSTGRES_USER: 'roblosats',
          POSTGRES_DB: 'roblosats',
          POSTGRES_PASSWORD: secrets.POSTGRES_PASSWORD,
        },
      },
      ready: {
        display: null,
        gracePeriod: 60_000,
        fn: async () => {
          const res = await postgresSub.exec([
            'pg_isready',
            '-h',
            '127.0.0.1',
            '-U',
            'roblosats',
          ])
          return res.exitCode === 0 ? ok : { result: 'starting', message: null }
        },
      },
      requires: [],
    })
    .addDaemon('redis', {
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'redis' },
        null,
        'redis',
      ),
      exec: {
        command: ['redis-server', '--bind', '127.0.0.1', '--save', ''],
      },
      ready: {
        display: null,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, ports.redis, {
            successMessage: '',
            errorMessage: '',
          }),
      },
      requires: [],
    })
    .addDaemon('node-rpc', {
      subcontainer: coordinator('node-rpc'),
      exec: {
        command: ['python3', '/startos/node-rpc.py'],
        env: { NODE_RPC_UPSTREAM: nodeRpc },
      },
      ready: {
        display: null,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, ports.nodeRpc, {
            successMessage: '',
            errorMessage: '',
          }),
      },
      requires: [],
    })
    .addDaemon('robosats', {
      subcontainer: robosatsSub,
      exec: {
        command: run([
          'gunicorn',
          '--bind',
          `127.0.0.1:${ports.gunicorn}`,
          '--max-requests',
          '1000',
          '--max-requests-jitter',
          '200',
          '-w',
          '2',
          'robosats.wsgi:application',
        ]),
        env: {
          ...env,
          ROBLOSATS_ROLE: 'main',
          SKIP_COLLECT_STATIC: '',
          ADMIN_PASSWORD: secrets.ADMIN_PASSWORD,
          LOG_TO_CONSOLE: '1',
        },
      },
      ready: {
        display: i18n('Roblosats server'),
        gracePeriod: 300_000,
        fn: async () => {
          const res = await sdk.healthCheck.checkPortListening(
            effects,
            ports.gunicorn,
            {
              successMessage: i18n('The coordinator is running'),
              errorMessage: i18n('The coordinator is not answering'),
            },
          )
          if (res.result === 'success') return res
          if (!lndGrpc)
            return {
              result: 'waiting',
              message: i18n(
                'Waiting for Lightning Fork: it must be running, with a wallet',
              ),
            }
          return {
            result: 'starting',
            message: i18n(
              'Starting: it waits for Tor, the database and Lightning Fork, then migrates the database',
            ),
          }
        },
      },
      requires: ['postgres', 'redis', 'tor'],
    })

  // The order and invoice loops, the websocket server and the task queue, as on Umbrel.
  for (const [id, command] of [
    [
      'daphne',
      [
        'daphne',
        '-b',
        '127.0.0.1',
        '-p',
        String(ports.daphne),
        'robosats.asgi:application',
      ],
    ],
    ['clean-orders', ['python3', 'manage.py', 'clean_orders']],
    ['follow-invoices', ['python3', 'manage.py', 'follow_invoices']],
    ['telegram-watcher', ['python3', 'manage.py', 'telegram_watcher']],
    ['celery', ['celery', '-A', 'robosats', 'worker', '--loglevel=WARNING']],
    [
      'celery-beat',
      [
        'celery',
        '-A',
        'robosats',
        'beat',
        '-l',
        'info',
        '--scheduler',
        'django_celery_beat.schedulers:DatabaseScheduler',
      ],
    ],
  ] as const) {
    const b = background(id)
    daemons = daemons.addDaemon(id, {
      subcontainer: coordinator(id),
      exec: { command: run([...command]), env },
      ready: b.ready,
      requires: b.requires,
    }) as unknown as typeof daemons
  }

  return daemons
    .addDaemon('panel', {
      // The app's page (/setup/): status, identity, liquidity, settings, backup and the request to
      // join the federation, signed by the node. Never on the onion. It sees the whole 'main'
      // volume: a backup import writes the onion's keys, secrets.env and the settings there.
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'roblosats' },
        sdk.Mounts.of()
          .mountAssets({ subpath: null, mountpoint: mnt.assets })
          .mountVolume({
            volumeId: 'main',
            subpath: null,
            mountpoint: mnt.main,
            readonly: false,
          })
          .mountDependency<T.SDKManifest>({
            dependencyId: lightningId,
            volumeId: 'main',
            subpath: null,
            mountpoint: mnt.lnd,
            readonly: true,
          }),
        'panel',
      ),
      exec: {
        command: ['python3', '/startos/panel.py'],
        env: {
          ...env,
          PANEL_PLATFORM: 'startos',
          APP_VERSION: packageVersion,
          // The admin login that a restored database is given (this install's).
          ADMIN_PASSWORD: secrets.ADMIN_PASSWORD,
        },
      },
      ready: {
        display: null,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, ports.panel, {
            successMessage: '',
            errorMessage: '',
          }),
      },
      requires: [],
    })
    .addDaemon('db-tool', {
      // The database side of the page's backups: pg_dump and psql, which the Roblosats image
      // lacks. Asked through files in main/panel/backup (see db-tool.sh).
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'postgres' },
        sdk.Mounts.of()
          .mountAssets({
            subpath: 'db-tool.sh',
            mountpoint: '/db-tool.sh',
            type: 'file',
          })
          .mountVolume({
            volumeId: 'main',
            subpath: 'panel',
            mountpoint: '/work',
            readonly: false,
          }),
        'db-tool',
      ),
      exec: {
        command: ['/bin/sh', '/db-tool.sh'],
        env: { POSTGRES_PASSWORD: secrets.POSTGRES_PASSWORD },
      },
      ready: { display: null, fn: () => ok },
      requires: ['postgres'],
    })
    .addDaemon('nginx', {
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'nginx' },
        sdk.Mounts.of()
          .mountAssets({
            subpath: 'nginx.conf',
            mountpoint: '/etc/nginx/conf.d/default.conf',
            type: 'file',
          })
          .mountVolume({
            volumeId: 'main',
            subpath: 'static',
            mountpoint: '/usr/src/static',
            readonly: true,
          })
          .mountVolume({
            volumeId: 'main',
            subpath: 'nginx-auth.conf',
            mountpoint: '/etc/nginx/conf.d/00-auth.conf',
            readonly: true,
            type: 'file',
          }),
        'nginx',
      ),
      exec: { command: sdk.useEntrypoint() },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: [],
    })
    .addDaemon('relay', {
      // The coordinator's Nostr relay, synced with the federation's relays over Tor.
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'relay' },
        sdk.Mounts.of()
          .mountAssets({
            subpath: 'strfry.conf',
            mountpoint: '/etc/strfry.conf',
            type: 'file',
          })
          .mountAssets({
            subpath: 'federation_urls.txt',
            mountpoint: '/app/federation_urls.txt',
            type: 'file',
          })
          // The image's sync, plus publishing the orders to public relays, as Kilobot does.
          .mountAssets({
            subpath: 'relay-sync.sh',
            mountpoint: '/app/sync.sh',
            type: 'file',
          })
          .mountAssets({
            subpath: 'external_urls.txt',
            mountpoint: '/app/external_urls.txt',
            type: 'file',
          })
          .mountVolume({
            volumeId: 'relay',
            subpath: null,
            mountpoint: '/app/strfry-db',
            readonly: false,
          }),
        'relay',
      ),
      exec: {
        command: sdk.useEntrypoint(),
        env: { TOR_PROXY: `127.0.0.1:${ports.socks}` },
      },
      ready: {
        display: i18n('Nostr relay'),
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://127.0.0.1:${ports.relay}/`,
            {
              successMessage: i18n('The relay is running'),
              errorMessage: i18n('The relay is not running'),
            },
          ),
      },
      requires: ['tor'],
    })
})
