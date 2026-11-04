import { secretsEnv } from '../fileModels/secrets.env'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { adminUser } from '../utils'

export const adminCredentials = sdk.Action.withoutInput(
  'admin-credentials',

  async () => ({
    name: i18n('Admin credentials'),
    description: i18n(
      "The login of the coordinator's page and of its admin panel (/coordinator/)",
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async () => {
    const password = await secretsEnv.read((s) => s.ADMIN_PASSWORD).once()
    if (!password) throw new Error(i18n('The service has not been set up yet'))
    return {
      version: '1',
      title: i18n('Admin credentials'),
      message: i18n(
        "Use them for the coordinator's page and, once more, for the admin panel. If you change the password in the admin panel, only the admin panel's changes.",
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: adminUser,
            masked: false,
            copyable: true,
            qr: false,
            launchable: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
            launchable: false,
          },
        ],
      },
    }
  },
)
