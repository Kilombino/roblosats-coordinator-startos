import { VersionInfo } from '@start9labs/start-sdk'

export const v0_9_10_0 = VersionInfo.of({
  version: '0.9.10:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.10. On-chain disputes: "penalize the seller / buyer (no trade)" and "trade completed" now work on chain too, explained on the dispute page like the other decisions (who signs, who gets what at which address). Robots notices can carry your clearnet order link (CLEARNET_ORDER_URL, empty by default). Swap payouts from 1 sat/vB (PAYOUT_MIN_FEE_RATE). The robots chat reconnects after a relay drop (app side). No database migrations.',
    es_ES:
      'Roblosats 0.9.10. Disputas on-chain: «Penalizar al vendedor / comprador (sin operación)» y «Operación completada» funcionan también en cadena, explicadas en la página de la disputa como las demás (quién firma, quién recibe qué y en qué dirección). Los avisos a los robots pueden llevar tu enlace clearnet de la orden (CLEARNET_ORDER_URL, vacío por defecto). Cobros por swap desde 1 sat/vB (PAYOUT_MIN_FEE_RATE). El chat de los robots se reconecta tras un corte del relay (en la app). Sin migraciones de la base de datos.',
    de_DE:
      'Roblosats 0.9.10. Alle Streitfallentscheidungen onchain. Keine Datenbankmigration.',
    pl_PL:
      'Roblosats 0.9.10. Wszystkie decyzje w sporach onchain. Bez migracji bazy danych.',
    fr_FR:
      'Roblosats 0.9.10. Toutes les décisions de litige onchain. Aucune migration de la base de données.',
  },
  migrations: {
    up: async () => {},
    // no database migration since 0.9.9: going back is safe
    down: async () => {},
  },
})
