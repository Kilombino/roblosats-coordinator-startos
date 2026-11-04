import { newSecrets, secretsEnv } from '../fileModels/secrets.env'
import { sdk } from '../sdk'

// The secrets are made once; a restore brings them back from the backup instead, and an
// update keeps them.
export const seedSecrets = sdk.setupOnInit(async (effects) => {
  const current = await secretsEnv.read().once()
  if (!current) await secretsEnv.write(effects, newSecrets())
})
