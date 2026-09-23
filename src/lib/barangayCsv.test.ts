import { describe, expect, it } from 'vitest';
import { barangayRecords } from '../data/civicRecords';
import { BARANGAY_CSV_HEADERS, buildBarangayCsv } from './barangayCsv';

function csvCell(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`;
}

describe('buildBarangayCsv', () => {
  it('includes attribution columns and repeats the source metadata on every row', () => {
    const lines = buildBarangayCsv(barangayRecords).split('\n');

    expect(lines[0]).toBe(BARANGAY_CSV_HEADERS.map(csvCell).join(','));
    expect(lines).toHaveLength(barangayRecords.length + 1);

    barangayRecords.forEach((record, index) => {
      const expectedRow = [
        record.name,
        record.code,
        record.population,
        record.householdPopulation,
        record.households,
        record.classification,
        record.source.label,
        record.source.url,
        record.source.dataPeriod ?? '',
        record.source.lastVerified,
      ];

      expect(lines[index + 1]).toBe(expectedRow.map(csvCell).join(','));
    });
  });

  it('escapes quotes in source metadata without breaking the CSV row', () => {
    const record = barangayRecords[0];
    const csv = buildBarangayCsv([
      {
        ...record,
        source: {
          ...record.source,
          label: 'PSA, "Population" table',
        },
      },
    ]);

    expect(csv.split('\n')[1]).toContain(csvCell('PSA, "Population" table'));
  });
});
