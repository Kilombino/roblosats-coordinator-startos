export const short = {
  en_US: 'Run your own Roblosats coordinator on Bitcoin (BLAKE2b)',
  es_ES: 'Tu propio coordinador de Roblosats en Bitcoin (BLAKE2b)',
  de_DE: 'Ihr eigener Roblosats-Koordinator auf Bitcoin (BLAKE2b)',
  pl_PL: 'Własny koordynator Roblosats na Bitcoinie (BLAKE2b)',
  fr_FR: 'Votre propre coordinateur Roblosats sur Bitcoin (BLAKE2b)',
}

export const long = {
  en_US:
    "A coordinator of Roblosats, the P2P exchange of the Bitcoin BLAKE2b chain (RoboSats for BTC): robots trade through your coordinator, with hold invoices on your Lightning Fork node, and you earn the trade fees. It brings the Roblosats server, its database, its Nostr relay (synced with the rest of the federation) and its own Tor onion, where robots reach it. Its page shows what is running, your onion, Nostr key and node id, your channels' liquidity, a Settings form, and Join the federation, where your node signs the request. Needs Lightning Fork with a wallet and channels, and Knots (BLAKE2b) Companion.",
  es_ES:
    'Un coordinador de Roblosats, el exchange P2P de la cadena Bitcoin BLAKE2b (RoboSats para BTC): los robots intercambian a través de tu coordinador, con facturas retenidas en tu nodo Lightning Fork, y tú cobras las comisiones. Incluye el servidor de Roblosats, su base de datos, su relay Nostr (sincronizado con el resto de la federación) y su propia onion de Tor, por la que llegan los robots. Su página muestra qué está funcionando, tu onion, clave Nostr e id de nodo, la liquidez de tus canales, un formulario de ajustes y Unirse a la federación, donde tu nodo firma la solicitud. Necesita Lightning Fork con cartera y canales, y Knots (BLAKE2b) Companion.',
  de_DE:
    'Ein Koordinator von Roblosats, der P2P-Börse der Bitcoin-BLAKE2b-Chain (RoboSats für BTC): Roboter handeln über Ihren Koordinator, mit Hold-Invoices auf Ihrem Lightning-Fork-Node, und Sie verdienen die Handelsgebühren. Enthält den Roblosats-Server, seine Datenbank, sein Nostr-Relay (mit der Föderation synchronisiert) und eine eigene Tor-Onion. Benötigt Lightning Fork mit Wallet und Kanälen sowie Knots (BLAKE2b) Companion.',
  pl_PL:
    'Koordynator Roblosats, giełdy P2P łańcucha Bitcoin BLAKE2b (RoboSats dla BTC): roboty handlują przez Twojego koordynatora, z fakturami wstrzymanymi na Twoim węźle Lightning Fork, a Ty zarabiasz prowizje. Zawiera serwer Roblosats, bazę danych, relay Nostr (zsynchronizowany z federacją) i własny adres onion Tor. Wymaga Lightning Fork z portfelem i kanałami oraz Knots (BLAKE2b) Companion.',
  fr_FR:
    "Un coordinateur de Roblosats, l'échange P2P de la chaîne Bitcoin BLAKE2b (RoboSats pour BTC) : les robots échangent via votre coordinateur, avec des factures bloquées sur votre nœud Lightning Fork, et vous touchez les frais. Comprend le serveur Roblosats, sa base de données, son relais Nostr (synchronisé avec la fédération) et son propre onion Tor. Nécessite Lightning Fork avec un portefeuille et des canaux, et Knots (BLAKE2b) Companion.",
}

export const lndDescription = {
  en_US:
    'Hold invoices for bonds and escrows, and payouts to buyers, on your Lightning node of the BLAKE2b chain',
  es_ES:
    'Facturas retenidas de fianzas y depósitos, y pagos a los compradores, en tu nodo Lightning de la cadena BLAKE2b',
  de_DE:
    'Hold-Invoices für Kautionen und Treuhand sowie Auszahlungen an Käufer auf Ihrem Lightning-Node der BLAKE2b-Chain',
  pl_PL:
    'Faktury wstrzymane dla kaucji i depozytów oraz wypłaty dla kupujących na Twoim węźle Lightning łańcucha BLAKE2b',
  fr_FR:
    'Factures bloquées pour les cautions et séquestres, et paiements aux acheteurs, sur votre nœud Lightning de la chaîne BLAKE2b',
}

export const nodeDescription = {
  en_US:
    'Checks the addresses of on-chain payouts to buyers and, if you switch on on-chain escrow, keeps its watch-only wallet (no private keys)',
  es_ES:
    'Comprueba las direcciones de los pagos on-chain a los compradores y, si activas el depósito on-chain, guarda su cartera de solo lectura (sin claves privadas)',
  de_DE: 'Prüft die Adressen der On-Chain-Auszahlungen an Käufer',
  pl_PL: 'Sprawdza adresy wypłat on-chain dla kupujących',
  fr_FR: 'Vérifie les adresses des paiements on-chain aux acheteurs',
}
