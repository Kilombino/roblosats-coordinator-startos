import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.17:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.17. Signed actions (security fix GHSA-22q8-9ghc-jg3h): every write a robot makes is signed with its own key and bound to your coordinator, so the token every coordinator of the federation sees can no longer be used to act as the robot. The package ships in transition (Settings: "Require signed actions" off): apps too old to sign keep working and are told once to update, and a robot that signed once must always sign. Switch it on once the old apps are gone. Migration 0076 (two new columns); going back to 0.9.16 is safe. Django 5.2.19.',
    es_ES:
      'Roblosats 0.9.17. Acciones firmadas (arreglo de seguridad GHSA-22q8-9ghc-jg3h): todo lo que hace un robot va firmado con su propia clave y ligado a tu coordinador, así que el token que ven todos los coordinadores de la federación ya no sirve para actuar como ese robot. El paquete viene en transición (Ajustes: «Require signed actions» desactivado): las apps que aún no firman siguen funcionando y se les avisa una vez de que actualicen, y un robot que firmó una vez tiene que firmar siempre. Actívalo cuando ya no queden apps viejas. Migración 0076 (dos columnas nuevas); volver a 0.9.16 es seguro. Django 5.2.19.',
    de_DE:
      'Roblosats 0.9.17. Signierte Aktionen (Sicherheitskorrektur GHSA-22q8-9ghc-jg3h); das Paket startet im Übergangsmodus („Require signed actions“ aus). Migration 0076; Zurück zu 0.9.16 ist sicher.',
    pl_PL:
      'Roblosats 0.9.17. Podpisane akcje (poprawka bezpieczeństwa GHSA-22q8-9ghc-jg3h); pakiet startuje w trybie przejściowym („Require signed actions” wyłączone). Migracja 0076; powrót do 0.9.16 jest bezpieczny.',
    fr_FR:
      'Roblosats 0.9.17. Actions signées (correctif de sécurité GHSA-22q8-9ghc-jg3h) ; le paquet démarre en mode transition (« Require signed actions » désactivé). Migration 0076 ; revenir à 0.9.16 est sûr.',
  },
  migrations: {
    up: async () => {},
    // 0076 only adds two nullable columns: 0.9.16 runs on the same database
    down: async () => {},
  },
})
