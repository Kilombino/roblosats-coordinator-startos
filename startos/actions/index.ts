import { sdk } from '../sdk'
import { adminCredentials } from './adminCredentials'

export const actions = sdk.Actions.of().addAction(adminCredentials)
