import { secretsEnv } from './fileModels/secrets.env'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { adminUser, uiHostId, uiInterfaceId, uiPort } from './utils'

// One interface: the app's page and the admin panel (nginx port 81), behind a login. The robots
// do not come this way: they reach the coordinator through its own onion (the tor daemon), whose
// keys live in this service's data.
export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const password = await secretsEnv.read((s) => s.ADMIN_PASSWORD).const(effects)

  const uiOrigin = await sdk.MultiHost.of(effects, uiHostId).bindPort(uiPort, {
    protocol: 'http',
    addSsl: password
      ? {
          auth: {
            type: 'basic',
            credentials: [{ username: adminUser, password }],
            realm: 'Roblosats Coordinator',
          },
        }
      : undefined,
  })

  const ui = sdk.createInterface(effects, {
    name: i18n('Coordinator'),
    id: uiInterfaceId,
    description: i18n(
      "The coordinator's page (status, settings, joining the federation) and its admin panel",
    ),
    type: 'ui',
    schemeOverride: null,
    masked: false,
    username: null,
    path: '/setup/',
    query: {},
  })

  return [await uiOrigin.export([ui])]
})
