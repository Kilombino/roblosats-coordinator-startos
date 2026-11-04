import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

/** The StartOS interface: nginx's port 81 (the app's page and the admin panel). */
export const uiPort = 81
export const uiHostId = 'ui'
export const uiInterfaceId = 'ui'
/** Username of the interface's login and of the Django superuser (ESCROW_USERNAME). */
export const adminUser = 'admin'

/** Ports inside the service, all on 127.0.0.1 (one network namespace, as on Umbrel). */
export const ports = {
  gunicorn: 8000,
  daphne: 9000,
  panel: 8090,
  relay: 7778,
  socks: 9050,
  postgres: 5432,
  redis: 6379,
  nodeRpc: 8332,
} as const

// Lightning Fork (github.com/paulscode/lightning-fork-startos): LND on the BLAKE2b chain, its
// volume laid out as LND's. Copied, not imported: that package is on another SDK version.
export const lightningId = 'lightning-fork'
export const lfGrpcHostId = 'grpc'
export const lfGrpcPort = 10009

// Knots (BLAKE2b) Companion (github.com/paulscode/knots-blake2b-startos): its RPC host and port
// are that package's contract with dependents; `.cookie` sits at the root of its 'main' volume.
export const nodeId = 'knots-blake2b'
export const knotsRpcHostId = 'rpc'
export const knotsRpcPort = 18443

/** Mountpoints in the coordinator's subcontainers. */
export const mnt = {
  assets: '/startos',
  panel: '/data/panel',
  /** The whole 'main' volume, for the app's page only (backups write the onion and secrets). */
  main: '/main',
  tor: '/tor',
  static: '/usr/src/static',
  lnd: '/lnd',
  bitcoind: '/mnt/bitcoind',
} as const

/** Lightning Fork's gRPC address on StartOS's bridge, `null` until its wallet is unlocked. */
export const lndGrpcBridge = (effects: T.Effects) =>
  sdk.host
    .getBridgeAddress(effects, {
      packageId: lightningId,
      hostId: lfGrpcHostId,
      internalPort: lfGrpcPort,
    })
    .const()

/** Knots (BLAKE2b) Companion's RPC address on the bridge, `null` while it is absent. */
export const nodeRpcBridge = (effects: T.Effects) =>
  sdk.host
    .getBridgeAddress(effects, {
      packageId: nodeId,
      hostId: knotsRpcHostId,
      internalPort: knotsRpcPort,
      ssl: false,
    })
    .const()

/**
 * The Roblosats server's environment, as in the Umbrel app's docker-compose.yml (x-roblosats).
 * The operator's settings (name, fees, limits…) are not here: run.sh reads them from
 * defaults.env (Kilobot's) and the app page's settings.local.env (what the user changed).
 */
export const roblosatsEnv = {
  SKIP_COLLECT_STATIC: 'true',
  LNVENDOR: 'LND',
  REDIS_URL: `redis://127.0.0.1:${ports.redis}/1`,
  POSTGRES_DB: 'roblosats',
  POSTGRES_USER: 'roblosats',
  POSTGRES_HOST: '127.0.0.1',
  POSTGRES_PORT: String(ports.postgres),
  USE_TOR: 'True',
  TOR_PROXY: `127.0.0.1:${ports.socks}`,
  STRFRY_HOST: '127.0.0.1',
  STRFRY_PORT: String(ports.relay),
  NETWORK: 'mainnet',
  // Price of Bitcoin (BLAKE2b): NonKYC and Neoxa, through mempool.kilombino.com (they block Tor).
  MARKET_PRICE_APIS: 'https://mempool.kilombino.com/nonkyc-ticker',
  NEOXA_TICKER_URL: 'https://mempool.kilombino.com/neoxa-ticker',
  MEMPOOL_FEES_URL: 'https://mempool.kilombino.com',
  BTCB2_FALLBACK_USD: '300',
  I2P_ALIAS: '',
  I2P_LONG: '',
  GEOBLOCKED_COUNTRIES: '',
  ALTERNATIVE_SITE: '',
  ALTERNATIVE_NAME: '',
  CHAT_NOTIFICATION_TIMEGAP: '5',
  PENALTY_TIMEOUT: '60',
  RETRY_TIME: '1',
  // BLAKE2b blocks come every ~9 minutes, with bursts: the hold invoices' timelocks count on it.
  BLOCK_TIME: '6',
  MAX_MINING_NETWORK_SPEEDUP_EXPECTED: '2.0',
  EXP_MAKER_BOND_INVOICE: '300',
  EXP_TAKER_BOND_INVOICE: '200',
  PROPORTIONAL_ROUTING_FEE_LIMIT: '0.001',
  MIN_FLAT_ROUTING_FEE_LIMIT_REWARD: '2',
  REWARDS_TIMEOUT_SECONDS: '30',
  PAYOUT_TIMEOUT_SECONDS: '90',
  DEBUG_PERMISSIONED_PAYOUTS: 'False',
  ALLOW_SELF_KEYSEND: 'False',
  SWAP_FEE_SHAPE: 'exponential',
  SWAP_LAMBDA: '8.8',
  MIN_SWAP_FEE: '0.008',
  MAX_SWAP_FEE: '0.1',
  SPEND_UNCONFIRMED: 'False',
  SUGGESTED_TARGET_CONF: '4',
  MINIMUM_TARGET_CONF: '24',
  SLASHED_BOND_REWARD_SPLIT: '0.5',
  ESCROW_USERNAME: adminUser,
  DISABLE_ORDER_LOGS: 'False',
  // Rewards and payouts (Roblosats hardening): limits on what can leave.
  HOLD_SLASHED_RETURN_ABOVE: '20000',
  REWARD_WITHDRAW_DELAY: '3600',
  REWARD_WITHDRAW_DAILY_MAX: '250000',
  REWARD_WITHDRAW_COOLDOWN: '86400',
  REWARD_WITHDRAW_GLOBAL_DAILY_MAX: '500000',
  // The node, through node-rpc.py (which signs each call with the node's cookie).
  NODE_KNOTS_BLAKE2B_IP: '127.0.0.1',
  NODE_KNOTS_BLAKE2B_PORT: String(ports.nodeRpc),
  NODE_KNOTS_BLAKE2B_USER: 'roblosats',
  NODE_KNOTS_BLAKE2B_PASS: 'cookie',
} as const
