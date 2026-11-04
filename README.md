<p align="center">
  <img src="icon.png" alt="Roblosats Coordinator Logo" width="21%">
</p>

# Roblosats Coordinator on StartOS

> Everything not listed in this document should behave the same as the Umbrel app
> **Roblosats Coordinator** (Kilombino/umbrel-store, `kilombino-roblosats-coordinator`) and the
> coordinator guide (Kilombino/roblosats-deploy `COORDINATOR.md`).

A coordinator of Roblosats, the P2P exchange of the Bitcoin BLAKE2b chain (a fork of RoboSats), with
its database, Nostr relay, own Tor onion and the coordinator's page with the request to join the
federation.

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)

## Image and Container Runtime

The images and digests of the Umbrel app: `ghcr.io/kilombino/roblosats-coordinator` (Roblosats
server), `ghcr.io/kilombino/roblosats-tor` (tor 0.4.9), `ghcr.io/kilombino/roblosats-relay` (strfry),
`postgres:14.2-alpine`, `redis:7.2.1-alpine`, `nginx:1.27-alpine`. x86_64 and aarch64.

All daemons share the service's network namespace and talk on 127.0.0.1, as on Umbrel (where they
share the tor container's namespace). One subcontainer per daemon:

| Daemon | Image | What it runs |
| --- | --- | --- |
| `tor` | roblosats-tor | SOCKS on 127.0.0.1:9050 and the coordinator's hidden service (onion port 80 → nginx 127.0.0.1:80) |
| `postgres` | postgres | database `roblosats`, 127.0.0.1:5432 |
| `redis` | redis | 127.0.0.1:6379, no persistence |
| `node-rpc` | roblosats-coordinator | `assets/node-rpc.py`: 127.0.0.1:8332 → Knots' RPC on the bridge, with the node's current cookie per call |
| `robosats` | roblosats-coordinator | gunicorn 127.0.0.1:8000; migrates the database and creates the `admin` superuser |
| `daphne`, `clean-orders`, `follow-invoices`, `telegram-watcher`, `celery`, `celery-beat` | roblosats-coordinator | as on Umbrel |
| `panel` | roblosats-coordinator | `assets/panel.py`, the coordinator's page, 127.0.0.1:8090 (`PANEL_PLATFORM=startos`); mounts all of `main` at `/main` |
| `db-tool` | postgres | `assets/db-tool.sh`: pg_dump / psql for the page's Backup, asked through files in `main/panel/backup` |
| `nginx` | nginx | 127.0.0.1:80 (the onion: public API, `/relay`, `/coordinator` → 403) and :81 (the StartOS interface: `/setup/` → panel, everything else → Django with Host `localhost`) |
| `relay` | roblosats-relay | strfry on 127.0.0.1:7778, synced every 2 minutes with the federation's relays through Tor (`assets/relay-sync.sh` over the image's `/app/sync.sh`), and pushing the last two weeks of orders (kind 38383) up to the relays in `assets/external_urls.txt` (relay.kilombino.com), as Kilobot does |

Every Roblosats daemon starts through `assets/run.sh`: it sources `defaults.env` (the recommended
settings, Kilobot's) and the panel's `settings.local.env` (only what the user changed), sets
`PAYOUT_MAX_SATS` to `MAX_ORDER_SIZE`, waits for the onion and for Lightning Fork's `tls.cert`, `admin.macaroon` and
gRPC address, reads the node id over gRPC, migrates (main role only; the others wait for
`migrate --check`), then runs the image's entrypoint.

## Volume and Data Layout

| Volume | Contents |
| --- | --- |
| `main` | `secrets.env`; `tor/` (the onion's keys, `tor/coordinator/hostname`); `panel/` (`settings.local.env`, `federation.json`, `last-backup.json`, `restored.json` until the restart after an import, `backup/` the db-tool's scratch); `static/` (Django's collected static files) |
| `db` | PostgreSQL's data directory |
| `relay` | strfry's LMDB |

Mounted read-only from dependencies: Lightning Fork's `main` at `/lnd`, Knots (BLAKE2b) Companion's
`main` at `/mnt/bitcoind` (for `.cookie`).

## File Models

- `main/secrets.env` (env): `SECRET_KEY`, `POSTGRES_PASSWORD`, `NOSTR_NSEC` (hex: the coordinator's
  Nostr key), `ADMIN_PASSWORD`. Created on install by init; restored from a StartOS backup. The
  page's Backup → Import rewrites `SECRET_KEY` and `NOSTR_NSEC` (keeping the other two).
- `main/panel/settings.local.env`: written by the coordinator's page (Settings), not by the package;
  it keeps only values that differ from `assets/defaults.env`. Read by run.sh after it on every
  start. The 0.8.8.27:1 migration drops values still at 0.8.8.27:0's defaults (that version saved
  every field) and pins `DISABLE_ONCHAIN='True'` when absent, so existing installs keep on-chain
  payouts off.

### Default settings (`assets/defaults.env`, the same as Kilobot)

`FEE=0.0019`, `MAKER_FEE_SPLIT=0.105`, `MIN_ORDER_SIZE=101000`, `MAX_ORDER_SIZE=100000000`,
`MAX_PUBLIC_ORDERS=100`, `DISABLE_ONCHAIN=False`, `MIN_SWAP_AMOUNT=101000`,
`MAX_SWAP_AMOUNT=6000000`, `DEVFUND=0.1` (Kilobot: 0, it is the maintainer's own node),
`ADMIN_TIME_ZONE=UTC`. The fixed environment (timelocks, rewards limits, price sources, swap fees)
is `roblosatsEnv` in `startos/utils.ts`, equal to Kilobot's except `BTCB2_FALLBACK_USD` (used only
before any price was fetched).

## Dependencies

- **Lightning Fork** (`lightning-fork`, required, running, health `lnd`): hold invoices and payouts.
  gRPC through the bridge address of its `grpc` host (port 10009), its `tls.cert` and
  `data/chain/bitcoin/mainnet/admin.macaroon`. Until the wallet is unlocked the bridge address is
  null and the coordinator waits; `main` re-runs when it appears.
- **Knots (BLAKE2b) Companion** (`knots-blake2b`, required, running, health `node`): `validateaddress`
  for on-chain payouts and the block height on the page, via `node-rpc` (cookie auth, so a node restart
  needs no restart here).

Both are on Paul's registry, `https://start9.paulscode.com`.

## Network Access and Interfaces

- `ui` (host `ui`, port 81, HTTP behind StartOS's TLS), path `/setup/`, gated with Basic auth at the
  StartOS proxy (user `admin`, `ADMIN_PASSWORD`). nginx clears the `Authorization` header before
  Django, which has its own login (same credentials) for `/coordinator/`.
- The robots' entrance is not a StartOS interface: the package's own tor daemon publishes the
  coordinator's onion, whose keys live in `main/tor` and so in this service's backups. That onion is
  the coordinator's federation identity, so it must not depend on the Tor service's per-interface
  onions. Outbound Tor (prices are fetched via mempool.kilombino.com in clearnet; the relay sync and
  `USE_TOR` calls use 127.0.0.1:9050) uses the same daemon.

## Installation and First-Run Flow

Init creates `secrets.env`. The first start creates the onion (≈1 min), initialises PostgreSQL,
migrates, collects static files and creates the `admin` superuser with `ADMIN_PASSWORD`. Without
Lightning Fork's wallet everything else runs and the `Roblosats server` check reports *waiting*.

## Actions

- `admin-credentials` (Admin credentials): shows user `admin` and `ADMIN_PASSWORD`. Read-only; any
  status.

## Tasks

None.

## Health Checks

- `tor`: the onion's hostname exists and SOCKS listens.
- `robosats` (Roblosats server): gunicorn listens; *waiting* while Lightning Fork's gRPC is absent.
- `nginx` (Web Interface): port 81.
- `relay` (Nostr relay): HTTP on 127.0.0.1:7778.
- The other daemons are hidden.

## Backups and Restore

`main` and `db`, copied with the service stopped. The relay is rebuilt from the federation. Restoring
brings back the same onion, Nostr key, admin password and database.

The coordinator's page also has **Backup** (`/setup/backup`), the same as on Umbrel:

- **Export**: one file, `roblosats-coordinator-<alias>-<date>.backup.gpg`, OpenPGP symmetric
  (gpg: AES-256, S2K SHA-512 iterated 65,011,712, MDC) with the user's passphrase (≥12
  characters). Inside, a tar.gz: `manifest.json` (onion, npub, orders, applied migrations),
  `secrets.env`, `tor/` (`hs_ed25519_secret_key`, `hs_ed25519_public_key`, `hostname`),
  `settings/` (`settings.local.env`, `federation.json`; Umbrel's `settings.env`) and `db.sql`
  (`pg_dump --no-owner --no-privileges` by `db-tool`). By hand: `gpg -d FILE > backup.tar.gz`.
- **Import** (file + passphrase + "the old coordinator is off"): refused with orders in progress,
  with orders already here unless "replace" is ticked, or when the backup has migrations this
  version lacks. `db-tool` replaces the database in one transaction; the `admin` password is set
  back to this install's `ADMIN_PASSWORD`; the onion's keys, `SECRET_KEY`, `NOSTR_NSEC` and the
  settings are written and take over at the next restart (the page says so until the running
  Nostr key is the restored one). A backup from Umbrel restores here too.

## Limitations and Differences

- No reset-password action: `ADMIN_PASSWORD` is fixed at install. A password changed in the admin
  panel changes only Django's login.
- Settings are changed on the coordinator's page only (no StartOS action) and apply on restart.
- Only Knots (BLAKE2b) Companion is offered as the node (Umbrel also accepts Bitcoin Knots 29.4.3).

---

## Quick Reference for AI Consumers

```yaml
package_id: 'roblosats-coordinator'
image: ghcr.io/kilombino/roblosats-coordinator (+ roblosats-tor, roblosats-relay, postgres, redis, nginx)
architectures: [x86_64, aarch64]
subcontainers: [tor, postgres, redis, node-rpc, robosats, daphne, clean-orders, follow-invoices, telegram-watcher, celery, celery-beat, panel, db-tool, nginx, relay]
volumes: { main: 'secrets, onion keys, panel settings, static', db: postgres, relay: strfry }
file_models: [main/secrets.env]
startos_managed_env_vars: [SECRET_KEY, POSTGRES_PASSWORD, NOSTR_NSEC, ADMIN_PASSWORD, LND_GRPC_HOST, NODE_RPC_UPSTREAM]
dependencies: [lightning-fork, knots-blake2b]
interfaces: { ui: 'port 81, path /setup/, basic auth admin' }
actions: [admin-credentials]
tasks: []
health_checks: [tor, robosats, nginx, relay]
```
