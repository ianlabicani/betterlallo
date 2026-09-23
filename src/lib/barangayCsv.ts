import type { BarangayRecord } from '../types/civic';

export const BARANGAY_CSV_HEADERS = [
  'Barangay',
  'PSGC code',
  'Population',
  'Household population',
  'Households',
  'Classification',
  'Source',
  'Source URL',
  'Data period',
  'Last reviewed',
] as const;

function escapeCell(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function buildBarangayCsv(records: readonly BarangayRecord[]): string {
  const rows: Array<Array<string | number>> = [
    [...BARANGAY_CSV_HEADERS],
    ...records.map(record => [
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
    ]),
  ];

  return rows.map(row => row.map(escapeCell).join(',')).join('\n');
}
