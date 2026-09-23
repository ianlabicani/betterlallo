import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SourceMeta } from '../components/civic/SourceMeta';
import {
  barangayRecords,
  civicContacts,
  departmentRecords,
  fdpDocumentRecords,
  financialSnapshots,
  heritageRecords,
  legislationRecords,
  officialSources,
  onlineServiceLinks,
  publicDirectoryRecords,
  serviceRecords,
  statisticRecords,
  transparencySections,
  updateRecords,
} from './civicRecords';
import { verifiedResourceGroups } from './verifiedResources';
import type { SourceRecord } from '../types/civic';

const displayedSources: Array<{ label: string; source: SourceRecord }> = [
  ...Object.entries(officialSources).map(([label, source]) => ({
    label: `official source: ${label}`,
    source,
  })),
  ...verifiedResourceGroups.flatMap(group =>
    group.resources.map(resource => ({
      label: `resource: ${resource.id}`,
      source: resource.source,
    }))
  ),
  ...civicContacts.map(record => ({
    label: `contact: ${record.id}`,
    source: record.source,
  })),
  ...departmentRecords.flatMap(record =>
    [record.source, ...(record.relatedSources ?? [])].map(source => ({
      label: `department: ${record.slug}`,
      source,
    }))
  ),
  ...fdpDocumentRecords.map(record => ({
    label: `disclosure document: ${record.id}`,
    source: record.source,
  })),
  ...heritageRecords.map(record => ({
    label: `heritage record: ${record.id}`,
    source: record.source,
  })),
  ...legislationRecords.map(record => ({
    label: `legislation: ${record.id}`,
    source: record.source,
  })),
  ...onlineServiceLinks.map(record => ({
    label: `online service: ${record.id}`,
    source: record.source,
  })),
  ...publicDirectoryRecords.flatMap(record =>
    [record.source, ...(record.relatedSources ?? [])].map(source => ({
      label: `public directory: ${record.slug}`,
      source,
    }))
  ),
  ...serviceRecords.flatMap(record =>
    [record.source, ...(record.relatedSources ?? [])].map(source => ({
      label: `service: ${record.slug}`,
      source,
    }))
  ),
  ...statisticRecords.map(record => ({
    label: `statistic: ${record.id}`,
    source: record.source,
  })),
  ...barangayRecords.map(record => ({
    label: `barangay: ${record.code}`,
    source: record.source,
  })),
  ...financialSnapshots.map(snapshot => ({
    label: `financial snapshot: ${snapshot.fiscalYear}`,
    source: snapshot.source,
  })),
  ...updateRecords.map(record => ({
    label: `update: ${record.id}`,
    source: record.source,
  })),
  ...transparencySections.flatMap(section => [
    ...section.sources.map(source => ({
      label: `transparency section: ${section.slug}`,
      source,
    })),
    ...(section.records ?? []).map(record => ({
      label: `transparency record: ${record.id}`,
      source: record.source,
    })),
  ]),
];

describe('source attribution', () => {
  it('renders a named source as a compact linked attribution', () => {
    const source = barangayRecords[0].source;
    const markup = renderToStaticMarkup(
      createElement(SourceMeta, { source, compact: true })
    );

    expect(markup).toContain('Source:');
    expect(markup).toContain(source.label);
    expect(markup).toContain(`href="${source.url}"`);
    expect(markup).not.toContain('Source details');
  });

  it('keeps source identity, scope, and review date on displayed structured records', () => {
    expect(displayedSources.length).toBeGreaterThan(0);

    for (const { label, source } of displayedSources) {
      expect(source.label.trim(), label).not.toBe('');
      expect(source.url, label).toMatch(/^https?:\/\//);
      expect(() => new URL(source.url), label).not.toThrow();
      expect(source.authority, label).toMatch(
        /^(municipal|provincial|regional|national)$/
      );
      expect(source.jurisdiction.trim(), label).not.toBe('');
      expect(source.sourceType.trim(), label).not.toBe('');
      expect(source.lastVerified, label).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('keeps a period with statistics, barangay data, and financial snapshots', () => {
    for (const statistic of statisticRecords) {
      expect(statistic.period.trim(), statistic.id).not.toBe('');
      expect(statistic.source.dataPeriod?.trim(), statistic.id).not.toBe('');
    }

    for (const record of barangayRecords) {
      expect(record.source.dataPeriod?.trim(), record.code).not.toBe('');
    }

    for (const snapshot of financialSnapshots) {
      expect(
        snapshot.source.dataPeriod?.trim(),
        String(snapshot.fiscalYear)
      ).not.toBe('');
    }

    for (const update of updateRecords) {
      expect(update.source.dataPeriod?.trim(), update.id).not.toBe('');
    }
  });
});
