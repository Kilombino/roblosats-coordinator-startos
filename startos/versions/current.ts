import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.8.8.30:0',
  releaseNotes: {
    en_US:
      'When the lightning payout to a buyer fails, the buyer can now switch to an onchain address from the "payment failed" screen (only if you offer onchain payouts; same swap fee and limits). Before paying onchain the server cancels the lightning payout, checks with LND that no attempt is in flight or already paid, and checks the escrow again; audit_payouts reports any order paid both ways.',
    es_ES:
      'Si falla el pago Lightning a un comprador, ahora puede pasarse a una dirección on-chain desde la pantalla de «pago fallido» (solo si ofreces cobros on-chain; misma comisión de swap y mismos límites). Antes de pagar on-chain, el servidor cancela el pago Lightning, comprueba con LND que no queda ningún intento en vuelo ni pagado y vuelve a comprobar el depósito; audit_payouts avisa si alguna orden se paga por las dos vías.',
    de_DE:
      'Schlägt die Lightning-Auszahlung an einen Käufer fehl, kann er jetzt im Bildschirm „Zahlung fehlgeschlagen“ auf eine Onchain-Adresse wechseln (nur wenn du Onchain-Auszahlungen anbietest). Vorher storniert der Server die Lightning-Zahlung und prüft mit LND, dass kein Versuch läuft oder bezahlt ist.',
    pl_PL:
      'Gdy wypłata Lightning dla kupującego się nie powiedzie, może on teraz przejść na adres onchain na ekranie „płatność nieudana” (tylko jeśli oferujesz wypłaty onchain). Wcześniej serwer anuluje płatność Lightning i sprawdza w LND, że żadna próba nie trwa ani nie została opłacona.',
    fr_FR:
      "Si le paiement Lightning à un acheteur échoue, il peut maintenant passer à une adresse onchain depuis l'écran « paiement échoué » (seulement si vous proposez les paiements onchain). Avant, le serveur annule le paiement Lightning et vérifie avec LND qu'aucune tentative n'est en cours ni payée.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
