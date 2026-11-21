import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.12:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.12. An onchain bond is no longer penalized when a dispute opens: it waits for your decision (back to its owner on chain, or penalized then), with a safety penalty before its timelock. Penalties use a fee ladder (ESCROW_PENALTY_RATES). A new watch tells robots, and you (on-chain alert group), when Spamcoin (SHA-256) lands on an onchain bond or funding address by mistake (mempool.space onion over Tor; SPAMCHAIN_WATCH=False turns it off). The relay federation filter of 0.9.11:1 is kept. One additive database migration (0072).',
    es_ES:
      'Roblosats 0.9.12. Una fianza on-chain ya no se penaliza al abrirse una disputa: espera a tu decisión (vuelve a su dueño on-chain, o se penaliza entonces), con una penalización de seguridad antes de su timelock. Las penalizaciones usan una escalera de comisiones (ESCROW_PENALTY_RATES). Un vigilante avisa a los robots, y a ti (grupo de avisos on-chain), cuando llegan Spamcoin (SHA-256) por error a una dirección de fianza o de aportación (onion de mempool.space por Tor; SPAMCHAIN_WATCH=False lo apaga). Se mantiene el filtro de federación del relay de 0.9.11:1. Una migración aditiva de la base de datos (0072).',
    de_DE:
      'Roblosats 0.9.12. Onchain-Kautionen werden bei Streitfällen erst bei der Entscheidung bestraft; Strafen mit Gebührenleiter; Überwachung von Spamcoin-Zahlungen (SHA-256) auf Onchain-Adressen. Relay-Föderationsfilter bleibt. Eine additive Datenbankmigration.',
    pl_PL:
      'Roblosats 0.9.12. Kaucje onchain w sporze są karane dopiero przy decyzji; kary z drabiną opłat; nadzór nad wpłatami Spamcoin (SHA-256) na adresy onchain. Filtr federacji relaya zostaje. Jedna addytywna migracja bazy danych.',
    fr_FR:
      'Roblosats 0.9.12. Les cautions onchain ne sont pénalisées qu’à la décision du litige ; pénalités avec échelle de frais ; surveillance des paiements Spamcoin (SHA-256) sur les adresses onchain. Le filtre de fédération du relais est conservé. Une migration additive de la base de données.',
  },
  migrations: {
    up: async () => {},
    // migration 0072 only adds columns with database defaults: 0.9.11 runs on it, going back is safe
    down: async () => {},
  },
})
