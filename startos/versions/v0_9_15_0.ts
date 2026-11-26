import { VersionInfo } from '@start9labs/start-sdk'

export const v0_9_15_0 = VersionInfo.of({
  version: '0.9.15:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.15 ("Stats for Nerds"). The 24 h contracted volume counts trades paid in Spamcoin and contracts taken with an onchain bond (they never logged a market tick); ticks of 1 BTC or more and Spamcoin prices now fit (migration 0075, it only widens two columns). The image records its commit, linked from the app; your Lightning node links to its Nodex page. To count your past trades taken with an onchain bond: backfill_market_ticks --apply (see COORDINATOR.md). Going back to 0.9.14 is safe.',
    es_ES:
      'Roblosats 0.9.15 («estadísticas para nerds»). El volumen contratado de 24 h cuenta los intercambios pagados en Spamcoin y los contratos tomados con fianza on-chain (nunca registraban un tick de mercado); los ticks de 1 BTC o más y los precios en Spamcoin ya caben (migración 0075, solo ensancha dos columnas). La imagen guarda su commit, enlazado desde la app; tu nodo Lightning enlaza a su página en Nodex. Para contar tus intercambios pasados tomados con fianza on-chain: backfill_market_ticks --apply (ver COORDINATOR.md). Volver a 0.9.14 es seguro.',
    de_DE:
      'Roblosats 0.9.15: 24-h-Volumen mit Spamcoin- und Onchain-Kautions-Trades; Commit- und Nodex-Links. Eine Migration (0075, nur breitere Spalten); Zurück zu 0.9.14 ist sicher.',
    pl_PL:
      'Roblosats 0.9.15: wolumen 24 h z transakcjami Spamcoin i z kaucją onchain; linki do commita i Nodex. Jedna migracja (0075, tylko szersze kolumny); powrót do 0.9.14 jest bezpieczny.',
    fr_FR:
      'Roblosats 0.9.15 : volume 24 h avec les échanges Spamcoin et à caution onchain ; liens du commit et Nodex. Une migration (0075, colonnes élargies seulement) ; revenir à 0.9.14 est sûr.',
  },
  migrations: {
    up: async () => {},
    // 0075 only widens two columns: 0.9.14 runs on it
    down: async () => {},
  },
})
