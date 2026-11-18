# Updating the upstream version

## Determining the upstream version

The coordinator is the image `ghcr.io/kilombino/roblosats-coordinator:<version>` (0.9.0 on; before, `0.8.8-rlN`; built from
Kilombino/roblosats, branch `roblosats`), the same one the Umbrel app `kilombino-roblosats-coordinator`
(Kilombino/umbrel-store) pins. Take the tag and index digest from that app's `docker-compose.yml`, or
`docker buildx imagetools inspect ghcr.io/kilombino/roblosats-coordinator:<tag>`.

## Applying the bump

- `startos/manifest/index.ts`: the `roblosats` image's `dockerTag` (`<tag>@sha256:<index digest>`); the
  same for `tor` and `relay` if the Umbrel app moved them.
- `startos/versions/current.ts`: the Roblosats version (`0.9.3:0` for 0.9.3; up to 0.8.8-rlN it was `0.8.8.N:0`), `:1`,
  `:2`… for package-only changes, and the release notes. Move the previous `current` to its own file in
  `startos/versions/` and add it to the graph's `other`.
- `assets/`: if the Umbrel app's own files changed (`tools/roblosats-coordinator` in the store repo:
  run.sh, panel.py, nginx.conf, torrc, strfry.conf, federation_urls.txt, and `data/settings.env`),
  carry the change over; see AGENTS.md for what differs here.
