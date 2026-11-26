import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.14:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.14. A Lightning order can be taken with an onchain bond where onchain escrow is on: the buyer (Hybrid C, the trade stays Lightning, only its bond is on chain) or the seller (Hybrid D, the order becomes an onchain-escrow order and the maker keeps its Lightning bond); same race as onchain orders (the order stays in the book, 3 h from the mempool, first bond locked wins). ESCROW_ONCHAIN_TAKER=False turns it off. The maker sees onchain takes on their way; a robot whose bond just confirmed is told at once to sign. Disputes: chat attached by default, or once afterwards (you get an alert). Alerts give the exact amount the screen asks for. Two additive database migrations (0073, 0074): going back is not offered, because an order taken on chain under 0.9.14 and still in progress would be mishandled by 0.9.12.',
    es_ES:
      'Roblosats 0.9.14. Una orden Lightning se puede tomar con fianza on-chain donde el depósito on-chain está activado: el comprador (Híbrida C, el intercambio sigue en Lightning, solo su fianza va on-chain) o el vendedor (Híbrida D, la orden pasa a depósito on-chain y el creador conserva su fianza Lightning); misma carrera que en órdenes on-chain (la orden sigue en el libro, 3 h desde la mempool, gana la primera fianza bloqueada). ESCROW_ONCHAIN_TAKER=False lo apaga. El creador ve las tomas on-chain en camino; a un robot cuya fianza acaba de confirmarse se le avisa al momento para que firme. Disputas: chat adjunto por defecto, o una vez después (recibes un aviso). Los avisos dan el importe exacto que pide la pantalla. Dos migraciones aditivas de la base de datos (0073, 0074): no se ofrece volver atrás, porque una orden tomada on-chain con 0.9.14 y aún en curso la manejaría mal la 0.9.12.',
    de_DE:
      'Roblosats 0.9.14. Lightning-Orders können mit einer Onchain-Kaution genommen werden (Käufer: Hybrid C; Verkäufer: Hybrid D); der Maker sieht Onchain-Übernahmen; Chat nachträglich an Streitfälle anhängen; exakte Beträge in Hinweisen. Zwei additive Datenbankmigrationen; kein Zurück.',
    pl_PL:
      'Roblosats 0.9.14. Zlecenia Lightning można przyjąć z kaucją onchain (kupujący: Hybrid C; sprzedający: Hybrid D); maker widzi przejęcia onchain; czat można dołączyć do sporu później; dokładne kwoty w powiadomieniach. Dwie addytywne migracje bazy danych; bez powrotu.',
    fr_FR:
      'Roblosats 0.9.14. Les ordres Lightning peuvent être pris avec une caution onchain (acheteur : Hybride C ; vendeur : Hybride D) ; le maker voit les prises onchain ; le chat peut être joint plus tard à un litige ; montants exacts dans les avis. Deux migrations additives de la base de données ; pas de retour.',
  },
  migrations: {
    up: async () => {},
    // 0073/0074 are additive, but an order taken on chain under 0.9.14 (hybrid C or D) and still in
    // progress would be handled as a plain Lightning order by 0.9.12: going back is not offered
    down: IMPOSSIBLE,
  },
})
