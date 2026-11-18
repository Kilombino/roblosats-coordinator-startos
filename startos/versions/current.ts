import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.3:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.3, recommended if you offer on-chain orders. An on-chain order could stay stuck before the deposit ("the seller\'s funding is short by N sats" on every loop) when the seller sent exactly the amount it was shown: the deposit now pays the highest fee rate the funding covers, down to 1 sat/vB, instead of asking for more. Taking an on-chain order on-chain after a cancelled Lightning take works again, the app is told what already confirmed at its funding address, and a robot whose signature is still missing after 90 seconds is reminded (Telegram, Nostr or webhook). No database migration; Lightning-only coordinators are not affected.',
    es_ES:
      "Roblosats 0.9.3, recomendada si ofreces órdenes on-chain. Una orden on-chain podía quedarse atascada antes del depósito («the seller's funding is short by N sats» en bucle) cuando el vendedor enviaba justo lo que se le indicó: ahora el depósito paga la tasa más alta que cubre la aportación, hasta 1 sat/vB, en vez de pedir más. Vuelve a funcionar tomar una orden on-chain en on-chain tras cancelar una toma Lightning, la app sabe lo que ya confirmó en su dirección de aportación y a un robot al que le falta firmar a los 90 segundos se le avisa (Telegram, Nostr o webhook). Sin migración de la base de datos; a los coordinadores solo Lightning no les afecta.",
    de_DE:
      'Roblosats 0.9.3, empfohlen, wenn du Onchain-Orders anbietest. Eine Onchain-Order konnte vor der Einzahlung hängen bleiben ("the seller\'s funding is short by N sats"), wenn der Verkäufer genau den angezeigten Betrag schickte: Die Einzahlung zahlt jetzt die höchste Gebührenrate, die die Einlage deckt (mindestens 1 sat/vB). Dazu Korrekturen bei der Annahme und Erinnerungen an fehlende Signaturen. Keine Datenbankmigration.',
    pl_PL:
      'Roblosats 0.9.3, zalecana, jeśli oferujesz zlecenia onchain. Zlecenie onchain mogło utknąć przed depozytem ("the seller\'s funding is short by N sats"), gdy sprzedający wysłał dokładnie pokazaną kwotę: depozyt płaci teraz najwyższą stawkę, jaką pokrywa wpłata (minimum 1 sat/vB). Do tego poprawki przyjmowania zleceń i przypomnienia o brakujących podpisach. Bez migracji bazy danych.',
    fr_FR:
      "Roblosats 0.9.3, recommandée si vous proposez des ordres onchain. Un ordre onchain pouvait rester bloqué avant le dépôt (« the seller's funding is short by N sats ») quand le vendeur envoyait exactement le montant affiché : le dépôt paie maintenant le taux le plus élevé que couvre l'apport (minimum 1 sat/vB). Plus des corrections à la prise d'ordre et des rappels de signatures manquantes. Pas de migration de la base de données.",
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
