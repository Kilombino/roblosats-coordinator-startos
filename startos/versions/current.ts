import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.7:0',
  releaseNotes: {
    en_US:
      "Roblosats 0.9.7. A free onchain bond goes back by itself: the owner's app pre-signs the return to its return or payout address with the penalty, and your coordinator broadcasts it only once the bond is free (never while it can be penalized or is in a deposit); otherwise the manual return works as before. The order summary shows each onchain payout as in the mempool or confirmed. A sat order paid only with Spamcoin is kept in Spamcoin. One database migration (0070), applied on start: update with no order in progress.",
    es_ES:
      'Roblosats 0.9.7. Una fianza on-chain libre vuelve sola: la app del dueño firma de antemano, con la penalización, la devolución a su dirección de devolución o de cobro, y tu coordinador la emite solo cuando la fianza queda libre (nunca mientras se pueda penalizar o esté en un depósito); si no, la devolución manual funciona como antes. El resumen de la orden muestra cada pago on-chain en la mempool o confirmado. Una orden en sats pagada solo con Spamcoin se queda en Spamcoin. Una migración de la base de datos (0070), al arrancar: actualiza sin órdenes en curso.',
    de_DE:
      'Roblosats 0.9.7. Eine freie Onchain-Kaution geht automatisch zurück; die Zusammenfassung zeigt den Status der Onchain-Auszahlung. Eine Datenbankmigration (0070): ohne laufende Orders aktualisieren.',
    pl_PL:
      'Roblosats 0.9.7. Wolna kaucja onchain wraca sama; podsumowanie pokazuje stan wypłaty onchain. Jedna migracja bazy danych (0070): aktualizuj bez trwających zleceń.',
    fr_FR:
      "Roblosats 0.9.7. Une caution onchain libre revient toute seule ; le résumé montre l'état du paiement onchain. Une migration de la base de données (0070) : mettez à jour sans ordre en cours.",
  },
  migrations: {
    up: async () => {},
    // 0.9.7 adds DB migration 0070 (applied by the app on start): an older app cannot run on it
    down: IMPOSSIBLE,
  },
})
