import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_8_8_29_0 = VersionInfo.of({
  version: '0.8.8.29:0',
  releaseNotes: {
    en_US:
      'Disputes are no longer solved automatically: when a chat expires with one side silent, the order comes to you as a dispute instead of being decided by who wrote last (the same change RoboSats makes in 0.8.8). Admin (0.8.8-rl28): solve a dispute with "Penalize the seller" or "Penalize the buyer" when there was no trade (each side gets its escrow back and only the one at fault loses the bond); a solved dispute shows its outcome and who gets what; new Failed payouts page with a count in the menu.',
    es_ES:
      'Las disputas ya no se resuelven solas: si un chat caduca con una de las partes en silencio, la orden te llega como disputa en vez de decidirse por quién escribió el último (el mismo cambio que hace RoboSats en la 0.8.8). Admin (0.8.8-rl28): resolver una disputa con «Penalizar al vendedor» o «Penalizar al comprador» cuando no hubo intercambio (cada parte recupera su escrow y solo el culpable pierde la fianza); una disputa resuelta muestra el resultado y a quién le toca qué; nueva página de pagos fallidos con contador en el menú.',
    de_DE:
      'Streitfälle werden nicht mehr automatisch entschieden: läuft ein Chat ab und eine Seite schweigt, wird die Order zum Streitfall für dich. Admin: „Verkäufer/Käufer bestrafen“ ohne Handel, Ergebnis eines gelösten Streitfalls, neue Seite für fehlgeschlagene Auszahlungen.',
    pl_PL:
      'Spory nie są już rozstrzygane automatycznie: gdy czat wygaśnie, a jedna strona milczy, zlecenie trafia do ciebie jako spór. Admin: „Ukarz sprzedającego/kupującego” bez wymiany, wynik rozstrzygniętego sporu, nowa strona nieudanych wypłat.',
    fr_FR:
      "Les litiges ne sont plus résolus automatiquement : si un chat expire avec une partie silencieuse, l'ordre vous arrive comme litige. Admin : « Pénaliser le vendeur/l'acheteur » sans échange, résultat d'un litige résolu, nouvelle page des paiements échoués.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
