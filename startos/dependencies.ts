import { lndDescription, nodeDescription } from './manifest/i18n'
import { sdk } from './sdk'
import { lightningId, nodeId } from './utils'

// Running and answering RPC is enough: the coordinator starts while the node syncs, and the
// app's page reports the sync.
const node = sdk.Dependency.required(nodeId, {
  description: nodeDescription,
  metadata: {
    title: 'Bitcoin Knots (BLAKE2b) Companion',
    icon: 'https://raw.githubusercontent.com/paulscode/knots-blake2b-startos/main/dep-icon.png',
  },
  kind: 'running',
  // 29.4.3 is the release that follows the chain past block 979919.
  versionRange: '>=29.4.3:0',
  healthChecks: ['node'],
})

// LND answering is enough to start: run.sh waits for its wallet's credentials, and the app's
// page shows its sync, channels and liquidity.
const lightningFork = sdk.Dependency.required(lightningId, {
  description: lndDescription,
  metadata: {
    title: 'Lightning Fork',
    icon: 'https://raw.githubusercontent.com/paulscode/lightning-fork-startos/master/icon.png',
  },
  kind: 'running',
  versionRange: '>=0.21.4-beta.18:0',
  healthChecks: ['lnd'],
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(node)
  .addDependency(lightningFork)
