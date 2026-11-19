import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.8:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.8. When another taker locks first (a Lightning bond locks in seconds, an on-chain one needs a confirmation), the other pending on-chain takes end at once: their bonds are freed (never penalized) and their robots are told; a robot whose take is over sees only its bond on the order page and takes it back from there. Two on-chain taker bonds locking at the same moment go to the robot that took first. No database migrations.',
    es_ES:
      'Roblosats 0.9.8. Cuando otro taker bloquea primero (una fianza Lightning se bloquea en segundos, una on-chain necesita una confirmación), las demás tomas on-chain pendientes terminan al momento: sus fianzas quedan libres (nunca se penalizan) y sus robots reciben un aviso; un robot cuya toma terminó ve solo su fianza en la página de la orden y la recupera desde allí. Si dos fianzas on-chain se bloquean a la vez gana el robot que tomó primero. Sin migraciones de la base de datos.',
    de_DE:
      'Roblosats 0.9.8. Ein Onchain-Taker, der das Rennen verliert, bekommt seine Kaution sofort frei und wird benachrichtigt. Keine Datenbankmigration.',
    pl_PL:
      'Roblosats 0.9.8. Taker onchain, który przegra wyścig, od razu odzyskuje kaucję i dostaje powiadomienie. Bez migracji bazy danych.',
    fr_FR:
      'Roblosats 0.9.8. Un preneur onchain qui perd la course récupère sa caution tout de suite et en est averti. Aucune migration de la base de données.',
  },
  migrations: {
    up: async () => {},
    // no database migration since 0.9.7-1: going back to it is safe
    down: async () => {},
  },
})
