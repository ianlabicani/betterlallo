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

Financial-report drafts must also include `extractionDate`, `rowIdentity`,
and numeric `metrics`. The validator checks the Lal-lo row identity and the
SRE reconciliation rules before an approved snapshot is copied into the app:

```json
{
  "sourceType": "financial-report",
  "extractionDate": "2026-03-03",
  "rowIdentity": {
    "sheet": "By LGU SRE 2025",
    "lguName": "Lal-Lo",
    "lguType": "Municipality",
    "excelRow": 454
  },
  "metrics": {
    "currentOperatingIncome": 458151828.33,
    "localSources": 59668346.33,
    "externalSources": 398483482,
    "currentOperatingExpenditures": 341155013.58,
    "netOperatingIncome": 116996814.75,
    "cashBalanceEnd": 176521490.35,
    "generalPublicServices": 221634390.4,
    "socialServices": 51643451.4,
    "economicServices": 62589324.89,
    "debtServiceInterest": 5287846.89
  }
}
```
