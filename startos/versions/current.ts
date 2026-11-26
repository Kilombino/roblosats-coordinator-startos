import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.16:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.16. Dispute winners (and the innocent side of a penalty) now also get SLASHED_BOND_REWARD_SPLIT of the loser\'s bond in Lightning-escrow orders (pure Lightning, Hybrid B, Hybrid C), as on-chain escrows already did; the dispute page shows the share and how the lost bond is split. New "At a glance" panel on the dispute page. Admin translations fixed (de/fr/it/ru). No database migrations: going back to 0.9.15 is safe.',
    es_ES:
      'Roblosats 0.9.16. Los ganadores de una disputa (y el inocente de una penalización) reciben también SLASHED_BOND_REWARD_SPLIT de la fianza del perdedor en órdenes con depósito Lightning (Lightning, Híbrida B, Híbrida C), como ya ocurría en los depósitos on-chain; la página de la disputa muestra esa parte y cómo se reparte la fianza perdida. Nuevo panel «De un vistazo» en la página de la disputa. Traducciones del panel corregidas (de/fr/it/ru). Sin migraciones: volver a 0.9.15 es seguro.',
    de_DE:
      'Roblosats 0.9.16. Gewinner eines Streitfalls erhalten auch bei Lightning-Treuhand einen Anteil der Kaution des Verlierers; neues Feld „Auf einen Blick“; Übersetzungen korrigiert. Keine Migrationen; Zurück zu 0.9.15 ist sicher.',
    pl_PL:
      'Roblosats 0.9.16. Zwycięzcy sporu dostają część kaucji przegranego także przy depozycie Lightning; nowy panel „W skrócie”; poprawione tłumaczenia. Bez migracji; powrót do 0.9.15 jest bezpieczny.',
    fr_FR:
      'Roblosats 0.9.16. Les gagnants d\'un litige reçoivent une part de la caution du perdant aussi avec un séquestre Lightning ; nouveau panneau « En un coup d\'œil » ; traductions corrigées. Aucune migration ; revenir à 0.9.15 est sûr.',
  },
  migrations: {
    up: async () => {},
    // no migrations: 0.9.15 runs on the same database
    down: async () => {},
  },
})
