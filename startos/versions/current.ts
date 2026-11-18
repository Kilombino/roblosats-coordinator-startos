import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.5:0',
  releaseNotes: {
    en_US:
      "Roblosats 0.9.5 (includes 0.9.4). On-chain orders: the seller's app signs the cooperative release alone through its leaf with the coordinator, which adds its signature and broadcasts; the buyer signs nothing and nobody has to come back for a second round. Releases started with older apps can be finished the same way. New mixed orders where the buyer took with Lightning use the seller's own rescue, so the buyer signs nothing on-chain. From 0.9.4: a notice for every step of an order (Telegram, Nostr and webhook, in English, Spanish or Catalan) and reminders 30 and 10 minutes before every deadline. No database migration; older escrows and older apps keep working.",
    es_ES:
      'Roblosats 0.9.5 (incluye la 0.9.4). Órdenes on-chain: la app del vendedor firma sola la liberación cooperativa por su hoja con el coordinador, que añade su firma y la emite; el comprador no firma nada y nadie tiene que volver para una segunda ronda. Las liberaciones empezadas con apps anteriores se terminan igual. Las órdenes mixtas nuevas en que el comprador tomó con Lightning usan el rescate propio del vendedor, así que el comprador no firma nada on-chain. De la 0.9.4: un aviso en cada paso de la orden (Telegram, Nostr y webhook, en inglés, castellano o catalán) y recordatorios 30 y 10 minutos antes de cada plazo. Sin migración de la base de datos; los depósitos y las apps anteriores siguen funcionando.',
    de_DE:
      'Roblosats 0.9.5 (inklusive 0.9.4). Onchain-Orders: Die App des Verkäufers signiert die kooperative Freigabe allein über ihr Blatt mit dem Koordinator; der Käufer signiert nichts. Aus 0.9.4: eine Nachricht bei jedem Schritt einer Order und Erinnerungen vor jeder Frist. Keine Datenbankmigration.',
    pl_PL:
      'Roblosats 0.9.5 (zawiera 0.9.4). Zlecenia onchain: aplikacja sprzedającego sama podpisuje zwolnienie przez swój liść z koordynatorem; kupujący niczego nie podpisuje. Z 0.9.4: powiadomienie przy każdym kroku zlecenia i przypomnienia przed każdym terminem. Bez migracji bazy danych.',
    fr_FR:
      "Roblosats 0.9.5 (inclut 0.9.4). Ordres onchain : l'application du vendeur signe seule la libération coopérative par sa feuille avec le coordinateur ; l'acheteur ne signe rien. Depuis 0.9.4 : une notification à chaque étape d'un ordre et des rappels avant chaque échéance. Pas de migration de la base de données.",
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
