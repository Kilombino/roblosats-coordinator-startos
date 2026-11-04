import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { readFile, writeFile } from 'fs/promises'
import { sdk } from '../sdk'

// 0.8.8.27:0's recommended settings. Its Settings page saved every field, changed or not, so on
// the way up the values still at these are dropped from settings.local.env and the new
// recommended ones (Kilobot's, in defaults.env) reach this install; what the user changed stays.
const oldDefaults: Record<string, string> = {
  COORDINATOR_ALIAS: 'My coordinator',
  NODE_ALIAS: 'My coordinator',
  FEE: '0.002',
  MAKER_FEE_SPLIT: '0.125',
  MIN_ORDER_SIZE: '20000',
  MAX_ORDER_SIZE: '1000000',
  MAX_PUBLIC_ORDERS: '100',
  MIN_SWAP_AMOUNT: '50000',
  MAX_SWAP_AMOUNT: '1000000',
  DEVFUND: '0.1',
  NOTICE_SEVERITY: 'none',
  NOTICE_MESSAGE: '',
  TELEGRAM_TOKEN: '',
  TELEGRAM_BOT_NAME: '',
  TELEGRAM_COORDINATOR_CHAT_ID: '',
  ADMIN_TIME_ZONE: 'UTC',
}

const unquote = (v: string) =>
  v.length >= 2 && v[0] === v[v.length - 1] && `'"`.includes(v[0])
    ? v.slice(1, -1)
    : v

export const current = VersionInfo.of({
  version: '0.8.8.27:1',
  releaseNotes: {
    en_US:
      "Settings as Kilobot runs them: fee 0.19 % (maker 10.5 %), orders from 101,000 to 100,000,000 sats (also the cap on a single payout), on-chain payouts on for new installs, from 101,000 to 6,000,000 sats. Values you never changed move to these on update; what you changed stays, and Settings shows the recommended value next to each field, with a button to use them all. On-chain payouts stay as they were on existing installs. New Backup page: export one file, encrypted with your passphrase, with the onion's keys, the Nostr key, the secrets, your settings and the database, and import it onto a new install (Umbrel or StartOS) to bring the coordinator back with the same onion, Nostr key and orders. The relay also publishes your orders to relay.kilombino.com, as Kilobot does.",
    es_ES:
      'Ajustes como los de Kilobot: comisión 0,19 % (maker 10,5 %), órdenes de 101.000 a 100.000.000 sats (también el tope de cada pago), pagos on-chain activados en instalaciones nuevas, de 101.000 a 6.000.000 sats. Los valores que nunca cambiaste pasan a estos al actualizar; lo que cambiaste se queda, y Ajustes muestra el valor recomendado junto a cada campo, con un botón para usarlos todos. En instalaciones existentes los pagos on-chain siguen como estaban. Nueva página Backup: exporta un único fichero, cifrado con tu frase, con las claves de la onion, la clave Nostr, los secretos, tus ajustes y la base de datos, e impórtalo en una instalación nueva (Umbrel o StartOS) para recuperar el coordinador con la misma onion, la misma clave Nostr y las mismas órdenes. El relay publica además tus órdenes en relay.kilombino.com, como hace Kilobot.',
    de_DE:
      'Einstellungen wie bei Kilobot (Gebühr 0,19 %, Orders 101.000 bis 100.000.000 sats); unveränderte Werte werden beim Update übernommen. Neue Backup-Seite: eine mit Passphrase verschlüsselte Datei mit Onion-Schlüsseln, Nostr-Schlüssel, Einstellungen und Datenbank exportieren und auf einer neuen Installation importieren.',
    pl_PL:
      'Ustawienia jak w Kilobot (opłata 0,19 %, zlecenia od 101 000 do 100 000 000 satów); niezmienione wartości są aktualizowane. Nowa strona Backup: eksport jednego pliku zaszyfrowanego hasłem (klucze onion, klucz Nostr, ustawienia, baza danych) i import na nowej instalacji.',
    fr_FR:
      "Réglages comme Kilobot (frais 0,19 %, ordres de 101 000 à 100 000 000 sats) ; les valeurs jamais modifiées sont mises à jour. Nouvelle page Backup : exporter un fichier chiffré par phrase de passe (clés de l'onion, clé Nostr, réglages, base de données) et l'importer sur une nouvelle installation.",
  },
  migrations: {
    up: async ({ effects }) => {
      const path = sdk.volumes.main.subpath('panel/settings.local.env')
      let text: string
      try {
        text = await readFile(path, 'utf8')
      } catch {
        text = ''
      }
      const kept: string[] = []
      let onchain = false
      for (const line of text.split('\n')) {
        const t = line.trim()
        if (!t || t.startsWith('#') || !t.includes('=')) continue
        const k = t.slice(0, t.indexOf('=')).trim()
        const v = unquote(t.slice(t.indexOf('=') + 1).trim())
        if (k === 'DISABLE_ONCHAIN') onchain = true
        if (k in oldDefaults && oldDefaults[k] === v) continue
        kept.push(t)
      }
      // On-chain payouts were off by default: keep them off here (turning them on would spend
      // Lightning Fork's on-chain funds without asking). New installs start with them on.
      if (!onchain) kept.push(`DISABLE_ONCHAIN='True'`)
      await writeFile(
        path,
        "# Written by the app's Settings page: only what differs from the app's settings; read after them.\n" +
          kept.sort().join('\n') +
          '\n',
        { mode: 0o600 },
      )
    },
    down: IMPOSSIBLE,
  },
})
