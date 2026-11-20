import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.9:0',
  releaseNotes: {
    en_US:
      "Roblosats 0.9.9. Payout, refund and bond return addresses can also be legacy (1…) and P2SH (3…); outputs use the dust threshold of each address type at your node's dust relay fee. A seller's leftover funding goes back to its payout address inside the deposit. Fair deadline: when a trader finishes its part of the on-chain setup, the other gets at least an hour. The order and dispute pages list the traders' addresses and every deposit and release output with its type. One migration (0071) that only records validators: no change to the database.",
    es_ES:
      'Roblosats 0.9.9. Las direcciones de cobro, devolución y fianza pueden ser también legacy (1…) y P2SH (3…); cada salida usa el límite de polvo de su tipo de dirección con el dustrelayfee de tu nodo. Lo que sobra de la aportación del vendedor vuelve a su dirección de cobro dentro del depósito. Plazo justo: cuando un trader termina su parte del montaje on-chain, el otro tiene al menos una hora. Las páginas de orden y de disputa listan las direcciones de los traders y cada salida del depósito y de la liberación con su tipo. Una migración (0071) que solo registra validadores: no cambia la base de datos.',
    de_DE:
      'Roblosats 0.9.9. Auch Legacy- (1…) und P2SH-Adressen (3…); übriges Funding geht zur Auszahlungsadresse zurück; faire Frist von mindestens einer Stunde. Migration 0071 ändert die Datenbank nicht.',
    pl_PL:
      'Roblosats 0.9.9. Również adresy legacy (1…) i P2SH (3…); nadwyżka wraca na adres wypłaty; sprawiedliwy termin co najmniej godziny. Migracja 0071 nie zmienia bazy danych.',
    fr_FR:
      "Roblosats 0.9.9. Adresses legacy (1…) et P2SH (3…) aussi ; le surplus revient à l'adresse de paiement ; délai équitable d'au moins une heure. La migration 0071 ne change pas la base de données.",
  },
  migrations: {
    up: async () => {},
    // 0071 only records validators (no SQL): going back to 0.9.8 is safe
    down: async () => {},
  },
})
