export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting Roblosats Coordinator': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  Coordinator: 4,
  "The coordinator's page (status, settings, joining the federation) and its admin panel": 5,
  'Admin credentials': 6,
  "The login of the coordinator's page and of its admin panel (/coordinator/)": 7,
  "Use them for the coordinator's page and, once more, for the admin panel. If you change the password in the admin panel, only the admin panel's changes.": 8,
  Username: 9,
  Password: 10,
  'The service has not been set up yet': 11,
  Tor: 12,
  "Creating the coordinator's onion": 13,
  "The coordinator's onion is ready": 14,
  'Tor is not running': 15,
  'Roblosats server': 16,
  'The coordinator is running': 17,
  'The coordinator is not answering': 18,
  'Waiting for Lightning Fork: it must be running, with a wallet': 19,
  'Starting: it waits for Tor, the database and Lightning Fork, then migrates the database': 20,
  'Nostr relay': 21,
  'The relay is running': 22,
  'The relay is not running': 23,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
