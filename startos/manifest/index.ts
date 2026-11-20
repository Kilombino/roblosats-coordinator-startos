import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'roblosats-coordinator',
  title: 'Roblosats Coordinator',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/Kilombino/roblosats-coordinator-startos',
  upstreamRepo: 'https://github.com/Kilombino/roblosats',
  marketingUrl: 'https://roblosats.kilombino.com',
  donationUrl: null,
  description: { short, long },
  // main: secrets.env, the onion's keys (tor/), the app page's settings (panel/), static files.
  // db: PostgreSQL. relay: the Nostr relay's events (rebuilt from the federation).
  volumes: ['main', 'db', 'relay'],
  images: {
    // The same images, by the same digests, as the Umbrel app 0.9.9-1.
    roblosats: {
      source: {
        dockerTag:
          'ghcr.io/kilombino/roblosats-coordinator:0.9.9-1@sha256:7ab651e378165c0d661d554525eaa688ae42fbd5d115f79c00c44b2f36f47161',
      },
      arch: ['x86_64', 'aarch64'],
    },
    tor: {
      source: {
        dockerTag:
          'ghcr.io/kilombino/roblosats-tor:0.4-2@sha256:baaa176cd78c2a837d8249a12f19ab34f772791d8a70dbe91a04970dbb4616d9',
      },
      arch: ['x86_64', 'aarch64'],
    },
    relay: {
      source: {
        dockerTag:
          'ghcr.io/kilombino/roblosats-relay:1.1.3-3@sha256:607980f2276c21dc2276828287e1d43ba85d5b0c76e2a8032e8c49e54c515dc7',
      },
      arch: ['x86_64', 'aarch64'],
    },
    postgres: {
      source: {
        dockerTag:
          'postgres:14.2-alpine@sha256:20e49432a20e1a63bb985977c32ec8f110bc609b93de35ad4f19c5486abcefaa',
      },
      arch: ['x86_64', 'aarch64'],
    },
    redis: {
      source: {
        dockerTag:
          'redis:7.2.1-alpine@sha256:a4c910678a1b358a88446b2fe1c5bb0417a5c9cfac4eba959f1e42d22f2e0af1',
      },
      arch: ['x86_64', 'aarch64'],
    },
    nginx: {
      source: {
        dockerTag:
          'nginx:1.27-alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
