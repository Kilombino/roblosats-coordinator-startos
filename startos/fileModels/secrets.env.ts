import { FileHelper, utils, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const hex = (len: number) => utils.getDefaultString({ charset: 'a-f,0-9', len })

/**
 * The coordinator's secrets, made once at install and kept in the 'main' volume (and so in its
 * backups): Django's key, the database password, the coordinator's Nostr key (it signs the
 * orders: losing it changes the coordinator's identity in the federation) and the admin password
 * (the StartOS interface's login and the Django superuser's). Never written over once set.
 * Fully modeled (z.object): this package is its only writer and an env file holds strings only.
 */
export const shape = z.object({
  SECRET_KEY: z.string().regex(/^[0-9a-f]{64}$/),
  POSTGRES_PASSWORD: z.string().regex(/^[0-9a-f]{48}$/),
  NOSTR_NSEC: z.string().regex(/^[0-9a-f]{64}$/),
  ADMIN_PASSWORD: z.string().regex(/^[A-Za-z0-9]{24,}$/),
})

export const newSecrets = () => ({
  SECRET_KEY: hex(64),
  POSTGRES_PASSWORD: hex(48),
  NOSTR_NSEC: hex(64),
  ADMIN_PASSWORD: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 24 }),
})

export const secretsEnv = FileHelper.env(
  { base: sdk.volumes.main, subpath: '/secrets.env' },
  shape,
)
