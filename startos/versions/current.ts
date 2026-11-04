import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.8.8.27:0',
  releaseNotes: {
    en_US:
      "First release for StartOS, the same as the Umbrel app Roblosats Coordinator 0.8.8-rl27-1: the Roblosats 0.8.8-rl27 server (order page with who won a dispute, earnings, payout fees and the chat; dispute panel; Telegram alerts from the admin panel), its database, its Nostr relay synced with the federation, and its own Tor onion. The app's page shows status, identity, liquidity and settings, and Join the federation shows where your request stands (not sent, waiting for the next Roblosats release, or listed).",
    es_ES:
      'Primera versión para StartOS, igual que la app de Umbrel Roblosats Coordinator 0.8.8-rl27-1: el servidor Roblosats 0.8.8-rl27 (página de la orden con quién ganó la disputa, ganancias, comisiones del pago y el chat; panel de disputas; avisos de Telegram desde el panel), su base de datos, su relay Nostr sincronizado con la federación y su propia onion de Tor. La página de la app muestra estado, identidad, liquidez y ajustes, y Unirse a la federación muestra en qué punto está tu solicitud (sin enviar, esperando la próxima versión de Roblosats o listado).',
    de_DE:
      'Erste Version für StartOS, entspricht der Umbrel-App Roblosats Coordinator 0.8.8-rl27-1: Roblosats-Server 0.8.8-rl27, Datenbank, Nostr-Relay (mit der Föderation synchronisiert) und eigene Tor-Onion.',
    pl_PL:
      'Pierwsze wydanie dla StartOS, takie samo jak aplikacja Umbrel Roblosats Coordinator 0.8.8-rl27-1: serwer Roblosats 0.8.8-rl27, baza danych, relay Nostr zsynchronizowany z federacją i własny adres onion Tor.',
    fr_FR:
      "Première version pour StartOS, identique à l'application Umbrel Roblosats Coordinator 0.8.8-rl27-1 : le serveur Roblosats 0.8.8-rl27, sa base de données, son relais Nostr synchronisé avec la fédération et son propre onion Tor.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
