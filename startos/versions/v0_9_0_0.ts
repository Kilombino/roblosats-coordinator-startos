import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_9_0_0 = VersionInfo.of({
  version: '0.9.0:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.0: optional non-custodial on-chain escrow. Nothing changes unless you switch it on: the coordinator stays Lightning-only. Settings has a new "On-chain escrow (optional)" section (switch, your fee and penalty address, on-chain order limits 20,000–101,000 sats, robots allowed, rescue timelock 2016 blocks). Switching on makes the escrow secret (never shown; in Backup → Export and in StartOS backups: export a new backup afterwards) and a watch-only wallet on Knots (BLAKE2b). Also: fixed-price and "丰 sat" orders, past orders and a final summary for robots, an on-chain view in the admin panel, many fixes. The database is migrated on start (0063–0069): update with no order in progress.',
    es_ES:
      'Roblosats 0.9.0: depósito on-chain sin custodia, opcional. No cambia nada si no lo activas: el coordinador sigue siendo solo Lightning. Ajustes tiene una sección nueva «On-chain escrow (optional)» (interruptor, tu dirección de comisiones y penalizaciones, límites de órdenes on-chain 20.000–101.000 sats, robots permitidos, plazo de rescate 2016 bloques). Al activarlo se crea el secreto del depósito (nunca se muestra; va en Backup → Export y en las copias de StartOS: exporta una copia nueva después) y una cartera de solo lectura en Knots (BLAKE2b). Además: órdenes a precio fijo y en «丰 sat», órdenes pasadas y resumen final para los robots, vista on-chain en el panel de administración y muchos arreglos. La base de datos se migra al arrancar (0063–0069): actualiza sin órdenes en curso.',
    de_DE:
      'Roblosats 0.9.0: optionale verwahrungsfreie On-Chain-Treuhand. Ohne Aktivierung bleibt der Koordinator reines Lightning. Neuer Abschnitt in den Einstellungen; beim Einschalten entsteht das Treuhand-Geheimnis (im Backup enthalten: danach neues Backup exportieren) und eine Watch-only-Wallet in Knots (BLAKE2b). Die Datenbank wird beim Start migriert.',
    pl_PL:
      'Roblosats 0.9.0: opcjonalny depozyt onchain bez powiernictwa. Bez włączenia koordynator działa tylko na Lightning. Nowa sekcja w ustawieniach; po włączeniu powstaje sekret depozytu (w kopii zapasowej: wyeksportuj nową) i portfel tylko do odczytu w Knots (BLAKE2b). Baza danych jest migrowana przy starcie.',
    fr_FR:
      "Roblosats 0.9.0 : séquestre onchain non custodial, optionnel. Sans activation, le coordinateur reste uniquement Lightning. Nouvelle section dans les réglages ; à l'activation, le secret du séquestre est créé (inclus dans la sauvegarde : exportez-en une nouvelle) ainsi qu'un portefeuille en lecture seule dans Knots (BLAKE2b). La base de données est migrée au démarrage.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
