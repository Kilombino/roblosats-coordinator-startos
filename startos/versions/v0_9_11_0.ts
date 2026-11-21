import { VersionInfo } from '@start9labs/start-sdk'

export const v0_9_11_0 = VersionInfo.of({
  version: '0.9.11:0',
  releaseNotes: {
    en_US:
      'Roblosats 0.9.11. Nostr order book: events of orders that left the book are now accepted by the relay (an expired order kept being listed), with NIP-69 statuses and a NIP-09 deletion. Automatic bond returns: a fee ladder (ESCROW_AUTO_RETURN_RATES, default 1,3 sat/vB); the cheapest rung the mempool needs is sent and bumped by RBF if it gets stuck. No database migrations. The Android app gains a Clearnet mode (beta): phones in that mode reach a coordinator with a clearnet URL in federation.json directly (and see its IP).',
    es_ES:
      'Roblosats 0.9.11. Libro Nostr: el relay acepta ya los eventos de las órdenes que salen del libro (una orden caducada seguía listada), con estados NIP-69 y borrado NIP-09. Devolución automática de fianzas: escalera de comisiones (ESCROW_AUTO_RETURN_RATES, por defecto 1,3 sat/vB); se manda el escalón más barato que pide la mempool y se sube por RBF si se atasca. Sin migraciones de la base de datos. La app de Android estrena el modo Clearnet (beta): en ese modo llega directa a los coordinadores con URL clearnet en federation.json (y ve su IP).',
    de_DE:
      'Roblosats 0.9.11. Nostr-Orderbuch korrigiert; automatische Kautionsrückgabe mit Gebührenleiter. Keine Datenbankmigration.',
    pl_PL:
      'Roblosats 0.9.11. Poprawiona księga Nostr; automatyczny zwrot kaucji z drabiną opłat. Bez migracji bazy danych.',
    fr_FR:
      'Roblosats 0.9.11. Carnet Nostr corrigé ; retour automatique des cautions avec une échelle de frais. Aucune migration de la base de données.',
  },
  migrations: {
    up: async () => {},
    // no database migration since 0.9.9: going back is safe
    down: async () => {},
  },
})
