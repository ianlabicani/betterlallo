# Source draft intake

Files in this directory are review drafts only. They are not loaded by Vite and are not published by the portal.

The `npm run source-drafts` check validates that each JSON draft includes:

- a stable `id` and plain-language `claim`;
- the direct official `sourceUrl`;
- source `authority`, `jurisdiction`, and `sourceType`;
- the publication date or `dataPeriod`; and
- `reviewStatus: "draft"` or `reviewStatus: "approved"`.

An approved draft is still not public by itself. A human reviewer must copy the supported wording into the typed app data and attach a `SourceRecord` with the same scope and review date. The importer does not fetch URLs, rewrite app files, or publish values automatically.

Use this shape for imports from PSA OpenSTAT, DBM documents, PhilGEPS notices, and government PDFs:

```json
{
  "id": "source-claim-id",
  "claim": "A narrowly worded claim supported by the source.",
  "sourceUrl": "https://official.example.gov/record",
  "authority": "national",
  "jurisdiction": "Lal-lo, Cagayan",
  "sourceType": "open-data",
  "publicationDate": "2026-09-21",
  "dataPeriod": "2024 POPCEN",
  "reviewStatus": "draft",
  "notes": "What still needs human review before publication."
}
```
