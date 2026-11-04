# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

- **`assets/` mirrors the Umbrel app's files** (Kilombino/umbrel-store `tools/roblosats-coordinator`
  and `kilombino-roblosats-coordinator/data/settings.env`). Port a change there by hand; what differs
  here, on purpose: paths (`/startos`, `/data/panel`), the platform's wording in `panel.py`, run.sh
  sourcing the settings itself and taking the node from `node-rpc.py` (new here), and nginx dropping
  the `Authorization` header of StartOS's login before Django.
- **Keep the onion in the package's own tor daemon**: the onion is the coordinator's identity in the
  federation, and StartOS's Tor plugin would keep its keys outside this service's backups.
- **Packing the second architecture**: start10's docker holds these images by digest for production
  (Kilobot, Ammanaya), so `make arm` fails with "cannot overwrite digest" and they must not be
  removed. Pack it against a throwaway daemon: `docker run -d --name dind --privileged -p
  127.0.0.1:23750:2375 -e DOCKER_TLS_CERTDIR= docker:28-dind --host=tcp://0.0.0.0:2375`, then
  `DOCKER_HOST=tcp://127.0.0.1:23750 make arm` (Docker ≥28: start-cli needs API 1.48). The
  gitHash must be a clean commit for a release.
- **`make` does not see an edit inside `assets/`** (it watches the directory's mtime): delete the
  `.s9pk` before `make` after changing a file there.
