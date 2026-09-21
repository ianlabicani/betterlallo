# BetterLal-lo

BetterLal-lo is an independent, open-source civic information portal for the Municipality of Lal-lo, Cagayan. It organizes public services, government information, barangay data, emergency references, and transparency sources in one mobile-friendly site.

This is a community project, not the official website of the Municipal Government of Lal-lo. Information should be checked against the linked government source before it is used for an application, payment, travel, or emergency response.

## Current scope

- English and Filipino interface text
- Lal-lo overview, officials, departments, barangays, and transparency sections
- Service guides for health, education, business, social welfare, agriculture, infrastructure, waste, environment, disaster preparedness, and land use
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
```

Use `npm run dev:yaml` when you need to regenerate the YAML-derived content output before starting Vite.

## Content locations

- `content/government/` — overview, departments, barangays, and transparency pages
- `content/services/` — service category indexes and Markdown guides
- `src/data/services.yaml` — service categories and navigation metadata
- `src/data/government.yaml` — government categories and navigation metadata
- `src/i18n/locales/` — English and Filipino interface translations
- `env.example` — public configuration values for a local or deployed environment

## Verification policy

Prefer current sources from Lal-lo and Cagayan government offices, PSA, COA, DBM, and other official government publishers. Do not invent contacts, fees, schedules, requirements, or project information. If a local detail has not been verified, leave it out or label it as pending verification.

The portal currently links to the Provincial Government of Cagayan, PSA’s Lal-lo PSGC profile, and Cagayan PDRRMO sources. Add a source URL and review date when publishing new factual content.

## Repository setup

This repository is a fork of [iyanski/betterlocalgov](https://github.com/iyanski/betterlocalgov).

```text
origin   https://github.com/ianlabicani/betterlallo.git
upstream https://github.com/iyanski/betterlocalgov.git
```

## Contributing

Open an issue or pull request with the source for any correction or addition. Keep content plain-language, accessible, and specific about what has been verified. Translations beyond English and Filipino, including a future Ilocano version, can be added without changing the content model.

## License

This project follows the repository’s [CC0 license](LICENSE).
