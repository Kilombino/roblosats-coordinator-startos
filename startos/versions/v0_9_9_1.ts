import { VersionInfo } from '@start9labs/start-sdk'

export const v0_9_9_1 = VersionInfo.of({
  version: '0.9.9:1',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.9-1 (server only). On-chain disputes can be resolved from the dispute page: it checks what the on-chain escrow needs and says, with the same numbers the release will use, who gets how many sats at which address, whose app must sign and what you keep; then it shows whose signature is missing and the release. A hybrid order\'s settled Lightning taker bond comes back as rewards on "return everything". The trader who does not sign a dispute release now waits for the other instead of seeing "signing together". The admin panel is also in Catalan. No database migrations.',
    es_ES:
      'Roblosats 0.9.9-1 (solo servidor). Las disputas on-chain se pueden resolver desde la página de la disputa: comprueba lo que necesita el depósito on-chain y dice, con los mismos números que usará la liberación, quién recibe cuántos sats y en qué dirección, qué app tiene que firmar y qué te quedas; después muestra qué firma falta y la liberación. En una orden híbrida, la fianza Lightning del tomador ya liquidada vuelve como recompensa en «Devolver todo». El trader que no firma una liberación de disputa espera al otro en vez de ver «firmando juntos». El panel también está en catalán. Sin migraciones de la base de datos.',
    de_DE:
      'Roblosats 0.9.9-1 (nur Server). Onchain-Streitfälle lassen sich auf der Streitfallseite lösen, mit Beträgen, Adressen und wer signieren muss. Keine Datenbankmigration.',
    pl_PL:
      'Roblosats 0.9.9-1 (tylko serwer). Spory onchain można rozstrzygać na stronie sporu: kwoty, adresy i kto musi podpisać. Bez migracji bazy danych.',
    fr_FR:
      'Roblosats 0.9.9-1 (serveur seulement). Les litiges onchain se règlent depuis la page du litige : montants, adresses et qui doit signer. Aucune migration de la base de données.',
  },
  migrations: {
    up: async () => {},
    // no database migration since 0.9.9: going back to it is safe
    down: async () => {},
  },
})
