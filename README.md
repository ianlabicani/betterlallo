# BetterLal-lo

BetterLal-lo is an independent, open-source civic information portal for the Municipality of Lal-lo, Cagayan. It organizes public services, government information, barangay data, emergency references, and transparency sources in one mobile-friendly site.

This is a community project, not the official website of the Municipal Government of Lal-lo. Information should be checked against the linked government source before it is used for an application, payment, travel, or emergency response.

## Current scope

- English, Filipino, and Ilocano interface text with English fallback for longer untranslated content
- Lal-lo overview, officials, departments, barangays, and transparency sections
- Service guides for health, education, business, social welfare, agriculture, infrastructure, waste, environment, disaster preparedness, and land use
- BetterLB-inspired quick access to financial, infrastructure, legislation, and statistics sections
- Structured service-record views with eligibility, requirements, fees, processing time, steps, responsible office, and verification states
- Searchable municipal office directory, statistics register, OpenLGU legislation filters, and financial/procurement/infrastructure transparency views
- Source-backed contact and emergency hub, compact verified-resources directory, updates feed, FAQ, legal/accessibility pages, sitemap, and a useful not-found route
- Dedicated certificate, tax-payment, and barangay-clearance guides with explicit pending states for unpublished local requirements
- Barangay population-by-record dashboard, downloadable CSV, municipal income snapshots, and heritage/tourism references
- Installable PWA manifest, service-worker offline fallback, and a static-first contribution guide for corrections
- Build-time local search with optional Meilisearch enhancement
- No-key Open-Meteo weather and Leaflet/OpenStreetMap map with loading, timeout, offline, and unavailable states
- Source links and last-reviewed notes for public information
- Static React, TypeScript, Vite, Tailwind, YAML, and Markdown content workflow

Version one does not include accounts, a backend database, citizen-report intake, Discord webhooks, or a purchased domain.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Useful checks:

```bash
npm run lint
npm run build
npm run source-drafts
```

Use `npm run dev:yaml` when you need to regenerate the YAML-derived content output before starting Vite.

## Optional Jev developer quality workflow

BetterLal-lo includes a project-scoped Codex MCP configuration for [Jev](https://docs.typesafe.ai/), TypeSafe's typed judgment layer. Jev returns structured judgments that can help focus development attention; it does not write code, commit changes, prove correctness, or replace deterministic checks and human review. See the [Jev coding-agent guidance](https://docs.typesafe.ai/introduction/coding-agents.md) for the broader model and limitations.

The configuration is tracked in [`.codex/config.toml`](.codex/config.toml). The Jev MCP package is pinned to a known version for repeatable setup; update that pin deliberately when changing the workflow.

### One-time developer setup

Each developer completes these steps on their own machine:

1. Create a TypeSafe API key and store it in the user environment as `TYPESAFE_API_KEY`. Never put the key in this repository, `.env.local`, a `VITE_` variable, a prompt, or the committed Codex configuration.

   For a temporary shell session:

   ```bash
   export TYPESAFE_API_KEY='your-new-typesafe-key'
   ```

2. Install the TypeSafe agent skill for Codex using the [official installation guidance](https://docs.typesafe.ai/agent-skill.md):

   ```bash
   npx skills add typesafe-ai/skills --skill typesafe-ai
   ```

   The installer is project-local by default; use `-g` only if you intentionally want a global installation.

3. Open the project in Codex and restart the client if it was already open. Confirm that the project-scoped `jev` MCP server is listed with `jev_classify`, `jev_review`, and `jev_gate` enabled.

Jev can be used at three optional checkpoints:

- Classify change risk and affected areas before choosing review and test depth.
- Review a focused diff and its evidence with `jev_review`.
- Check completion claims and reported test evidence with `jev_gate` before handoff.

Jev improves where attention goes; it does not prove correctness. BetterLal-lo's authoritative checks remain `npm run lint`, `npm run build`, `npm run format:check`, `npm run source-drafts`, and human review. If the API key is missing, authentication fails, the service is unavailable or rate-limited, or a result is malformed or low-confidence, use those deterministic checks and normal human review instead.

Only send Jev the focused repository context needed for the judgment. Do not send `.env` files, credentials, dependencies, build output, or unrelated source files.

## Content locations

- `content/government/` — overview, departments, barangays, and transparency pages
- `content/services/` — service category indexes and Markdown guides
- `src/data/services.yaml` — service categories and navigation metadata
- `src/data/government.yaml` — government categories and navigation metadata
- `src/data/civicRecords.ts` — typed source-backed service, contact, update, heritage, department, statistic, legislation, and transparency records
- `src/data/verifiedResources.ts` — compact grouped resource links derived from verified civic records
- `src/data/contentIndex.ts` — build-time client-side search index
- `src/components/civic/` — structured civic records, sources, weather, and map UI
- `src/i18n/locales/` — English, Filipino, and Ilocano interface translations
- `public/manifest.webmanifest`, `public/sw.js`, and `public/offline.html` — installable/offline portal support
- `env.example` — public configuration values for a local or deployed environment
- `research/source-ledger.md` — non-published official-source inventory and scope notes
- `research/drafts/` — human-review-only import candidates; they are never loaded by the app
- `research/remaining-pending.md` — evidence gaps that still need a direct official source

## Verification policy

Prefer current sources from Lal-lo and Cagayan government offices, PSA, COA, DBM, and other official government publishers. Do not invent contacts, fees, schedules, requirements, or project information. If a local detail lacks direct evidence, leave it out or explain the source gap and the evidence needed next.

The portal currently links to the Provincial Government of Cagayan, PSA’s Lal-lo PSGC profile, and Cagayan PDRRMO sources. Add a source URL and review date when publishing new factual content.

Run `npm run source-drafts` after adding an import candidate. The check validates source scope and review fields but does not publish or modify app data.

The map uses a bundled Lal-lo boundary GeoJSON feature from [OSSPhilippines/geoph](https://github.com/OSSPhilippines/geoph) over OpenStreetMap tiles. The source labels Lal-Lo as a city-level feature; this portal uses it for municipality-level map orientation. The Municipal Hall pin and weather coordinates remain public configuration values for the verified OpenStreetMap feature. When those coordinates are configured, the map also offers an API-key-free Google Maps destination link for orientation; Google Maps is not used as the boundary or location source. Open-Meteo is fetched client-side without an API key. The BetterLGU directory contribution remains separate and no registration pull request is opened by this repository.

## Repository setup

This repository is a fork of [iyanski/betterlocalgov](https://github.com/iyanski/betterlocalgov).

```text
origin   https://github.com/ianlabicani/betterlallo.git
upstream https://github.com/iyanski/betterlocalgov.git
```

## Contributing

Open an issue or pull request with the source for any correction or addition. Keep content plain-language, accessible, and specific about what has been verified. Longer-form translations, including Ilocano content, can be added without changing the content model.

## License

This project follows the repository’s [CC0 license](LICENSE).
