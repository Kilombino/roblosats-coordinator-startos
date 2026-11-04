import { sdk } from './sdk'

// main holds the coordinator's identity (the onion's keys and the Nostr key in secrets.env) and
// the app page's settings; db the orders, robots and rewards. The service is stopped while it
// runs, so PostgreSQL's files are copied at rest. The relay's events come back from the
// federation's relays.
export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('main', 'db'),
)
