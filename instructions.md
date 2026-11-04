# Roblosats Coordinator

Running a coordinator means solving disputes and keeping your Lightning node healthy: read the coordinator guide before you open it to robots.

## Documentation

- [Coordinator guide](https://github.com/Kilombino/roblosats-deploy/blob/roblosats/COORDINATOR.md) — running a Roblosats coordinator: liquidity, fees, disputes, joining the federation.
- [Roblosats](https://github.com/Kilombino/roblosats/blob/roblosats/README.md) — the exchange's source and README.

## What you get

- The **Coordinator** interface: the coordinator's own page (status, onion, Nostr key and node id, channel liquidity, Settings, Join the federation) and the **admin panel** at `/coordinator/` (orders, disputes, robots, rewards, Telegram alerts). It asks for a login: user `admin` and the password from the **Admin credentials** action. The admin panel asks for the same credentials once more.
- The coordinator's **own Tor onion**, where robots reach it. Its keys are kept in this service's data and backups: the onion and the Nostr key are your coordinator's identity in the federation. You don't need the Tor service or to add an onion to the interface for this.
- A Nostr relay that syncs orders and ratings with the other coordinators of the federation.

## Getting set up

1. Install **Bitcoin Knots (BLAKE2b) Companion** and **Lightning Fork** from Paul's registry (`https://start9.paulscode.com`); in Lightning Fork, select the node and create the wallet.
2. Open channels in Lightning Fork: inbound liquidity to receive bonds and escrows, outbound to pay buyers, each above your largest order.
3. Start Roblosats Coordinator and run **Admin credentials**. Open the **Coordinator** interface and log in. The first start creates the onion and the database and takes a few minutes; the page says what it is waiting for.
4. In **Settings**, give your coordinator a name and set the fees and order limits; then restart the service.
5. Test it: open Roblosats in Tor Browser, add your onion under Coordinators, and buy and sell a small amount with two robots, paying from a wallet on another node.
6. **Join the federation**: fill in your contact and description, press **Sign with my node**, then **Open the request on GitHub** (or send it on Telegram). The page shows *Waiting* until a Roblosats release includes you, then *Listed in the federation*.

## Using it

- Settings saved on the page take effect when the service restarts. **Never restart, stop or update the service while an order is in progress** (the page shows how many there are).
- Disputes: open them from the page or the admin panel, read both robots' chat, ask for proof and settle it for one of them.

### Actions

- **Admin credentials** — the user and password of the Coordinator interface and of the admin panel.
