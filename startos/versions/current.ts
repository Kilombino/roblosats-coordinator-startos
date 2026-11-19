import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.7:1',
  releaseNotes: {
    en_US:
      "Roblosats 0.9.7, coordinator panels. Settings: three on-chain settings the server already had are now on the page with their recommended values (Lightning takes of on-chain orders, the smallest on-chain fee for you, the lowest deposit fee rate), and the on-chain card says that the one-signature release and the automatic bond return are always on. Admin panel: the dispute page now shows the on-chain section too; the order page shows how the release was signed (seller's leaf or both), the hybrid plan, each bond's automatic return (signed, sent by itself or by hand) and whether the release and the on-chain payout are in the mempool or confirmed; Spamcoin orders say Spamcoin, not BTC; Failed payouts lists on-chain payouts still queued; a new Telegram alert tells you when a free bond did not go back by itself. New Telegram alert groups, each with its own switch in admin panel → Telegram alerts: on-chain order events (bonds and deposits in the mempool and confirmed, deposit signed, release, automatic bond returns, swap payouts, rescues) and your node's on-chain wallet (payments in and out, channel opens and closes, high mining fees); nothing old is sent when you switch them on. Alerts can now be in Catalan. One small database migration of the admin app, applied on start.",
    es_ES:
      'Roblosats 0.9.7, paneles del coordinador. Ajustes: tres ajustes on-chain que el servidor ya tenía salen ahora en la página con su valor recomendado (tomas con Lightning de órdenes on-chain, tu comisión on-chain mínima y la tasa mínima del depósito), y la tarjeta on-chain dice que la liberación con una firma y la devolución automática de fianzas están siempre activas. Panel de administración: la página de disputa muestra también la sección on-chain; la de la orden muestra cómo se firmó la liberación (hoja del vendedor o los dos), el plan híbrido, la devolución automática de cada fianza (firmada, enviada sola o a mano) y si la liberación y el pago on-chain están en la mempool o confirmados; las órdenes en Spamcoin dicen Spamcoin y no BTC; Pagos fallidos lista los pagos on-chain que siguen en cola; y un aviso nuevo de Telegram te dice cuándo una fianza libre no volvió sola. Grupos nuevos de avisos por Telegram, cada uno con su interruptor en el panel de administración → Avisos por Telegram: movimientos on-chain de las órdenes (fianzas y depósitos en la mempool y confirmados, depósito firmado, liberación, devoluciones automáticas, pagos del swap, rescates) y el monedero on-chain de tu nodo (pagos que entran y salen, canales abiertos y cerrados, comisiones altas); al activarlos no se manda nada antiguo. Los avisos ya pueden ir en catalán. Una pequeña migración de la base de datos de la app de administración, al arrancar.',
    de_DE:
      'Roblosats 0.9.7, Koordinator-Panels: drei weitere Onchain-Einstellungen mit empfohlenen Werten; im Admin-Panel zeigt die Streitfall-Seite den Onchain-Bereich, die Order-Seite Freigabeweg, automatische Kautionsrückgabe und Bestätigungsstatus; neuer Telegram-Hinweis, wenn eine Kaution nicht von selbst zurückging.',
    pl_PL:
      'Roblosats 0.9.7, panele koordynatora: trzy kolejne ustawienia onchain z zalecanymi wartościami; w panelu administracyjnym strona sporu pokazuje sekcję onchain, a strona zlecenia sposób zwolnienia, automatyczny zwrot kaucji i stan potwierdzenia; nowy alert Telegram, gdy kaucja nie wróciła sama.',
    fr_FR:
      "Roblosats 0.9.7, panneaux du coordinateur : trois réglages onchain de plus avec leurs valeurs recommandées ; dans le panneau d'administration, la page de litige montre la section onchain, la page d'ordre le mode de libération, le retour automatique des cautions et l'état de confirmation ; nouvelle alerte Telegram quand une caution n'est pas revenue d'elle-même.",
  },
  migrations: {
    up: async () => {},
    // 0.9.7 adds DB migration 0070 (applied by the app on start): an older app cannot run on it
    down: IMPOSSIBLE,
  },
})
