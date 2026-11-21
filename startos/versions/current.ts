import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.11:1',
  releaseNotes: {
    en_US:
      'Relay federation filter (packaging only, same server image). The Nostr relay now stores order events (kind 38383) only from the coordinators of the Roblosats federation, and ratings (31986) only of them; its sync with the other relays asks only for those and no longer copies chat wraps (1059) from them. The coordinator list follows the official federation.json by itself, checked every hour: a new coordinator is accepted with no update of this service, and on any error the last good list stays. Your own coordinator is always in the list, even before federation.json lists it. Orders of other federations stored earlier are dropped once. The list is allowed-order-pubkeys.txt in the relay volume; a line "manual" in it stops the updates.',
    es_ES:
      'Filtro de federación en el relay (solo empaquetado, misma imagen del servidor). El relay Nostr guarda ya solo las órdenes (kind 38383) de los coordinadores de la federación Roblosats, y solo las valoraciones (31986) de ellos; su sincronización con los demás relays pide solo eso y deja de copiar los gift wraps de chat (1059). La lista de coordinadores sigue sola al federation.json oficial, revisado cada hora: un coordinador nuevo se acepta sin actualizar este servicio, y ante cualquier error se queda la última lista buena. Tu propio coordinador siempre está en la lista, aunque federation.json aún no lo tenga. Las órdenes de otras federaciones guardadas antes se borran una vez. La lista es allowed-order-pubkeys.txt en el volumen del relay; una línea "manual" detiene las actualizaciones.',
    de_DE:
      'Föderationsfilter im Relay: nur Orders und Bewertungen der Roblosats-Föderation, Liste stündlich aus federation.json. Gleiches Server-Image.',
    pl_PL:
      'Filtr federacji w relayu: tylko zlecenia i oceny federacji Roblosats, lista co godzinę z federation.json. Ten sam obraz serwera.',
    fr_FR:
      'Filtre de fédération du relais : seulement les ordres et avis de la fédération Roblosats, liste mise à jour chaque heure depuis federation.json. Même image serveur.',
  },
  migrations: {
    up: async () => {},
    // packaging only: going back is safe
    down: async () => {},
  },
})
