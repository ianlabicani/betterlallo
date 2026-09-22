import {
  barangayRecords,
  civicContacts,
  departmentRecords,
  financialSnapshots,
  heritageRecords,
  publicDirectoryRecords,
  serviceRecords,
  statisticRecords,
  transparencySections,
  updateRecords,
} from './civicRecords';
import { localContentIndex } from './localContentIndex';
import type {
  CivicContact,
  DepartmentRecord,
  FinancialSnapshot,
  HeritageRecord,
  ServiceRecord,
  SourceRecord,
  StatisticRecord,
  TransparencyRecord,
  UpdateRecord,
} from '../types/civic';
import type {
  ChatLanguage,
  ChatSourceFamily,
  ChatSourceMetadata,
  PublicChatRecord,
} from '../types/publicChat';

export interface PublicChatFaq {
  id: string;
  question: string;
  answer: string;
  link?: {
    label: string;
    href: string;
  };
}

export const publicChatFaqs: PublicChatFaq[] = [
  {
    id: 'official-portal',
    question: 'Is BetterLal-lo the official municipal government website?',
    answer:
      'No. BetterLal-lo is an independent, community-run information portal. It links to official sources but does not speak for the Municipal Government of Lal-lo or accept applications and payments.',
  },
  {
    id: 'applications-payments',
    question: 'Can I use the portal to apply, pay, or file a report?',
    answer:
      'Not currently. The portal provides guides and source links. Confirm the current transaction channel with the responsible office, request an official receipt for payments, and do not send personal documents to an unofficial intermediary.',
  },
  {
    id: 'review-policy',
    question: 'How are contacts, updates, and statistics reviewed?',
    answer:
      'Published records include an attributable source, jurisdiction, period where available, and last-reviewed date. The portal keeps a record pending when the source does not establish a local detail.',
  },
  {
    id: 'pending-fields',
    question: 'Why does a page say that a field is pending?',
    answer:
      'A pending label means the evidence needed for that exact Lal-lo detail was not found or approved for publication. It is intentional: fees, requirements, schedules, phone numbers, and procedures are not guessed.',
  },
  {
    id: 'emergency-references',
    question: 'Where can I find emergency contact references?',
    answer:
      'Open the emergency and contact hub. Follow current responder instructions and confirm channel availability before relying on a published number.',
    link: {
      label: 'Open emergency and contact hub',
      href: '/contact#emergency',
    },
  },
  {
    id: 'suggest-correction',
    question: 'How can I suggest a correction?',
    answer:
      'Use the contribution guide to send the exact source, field, period, and correction. Maintainers review changes before they are added to the static site.',
    link: {
      label: 'Open the contribution guide',
      href: '/contribute',
    },
  },
];

function toChatSource(source: SourceRecord): ChatSourceMetadata {
  return {
    label: source.label,
    url: source.url,
    lastVerified: source.lastVerified,
    authority: source.authority,
    jurisdiction: source.jurisdiction,
    sourceType: source.sourceType,
  };
}

function combineSources(
  source: SourceRecord,
  relatedSources: SourceRecord[] = []
): ChatSourceMetadata[] {
  const sources = [source, ...relatedSources].map(toChatSource);
  const seen = new Set<string>();

  return sources.filter(item => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function textParts(parts: Array<string | undefined | null>): string {
  return parts
    .filter((part): part is string => Boolean(part?.trim()))
    .join('\n');
}

function serviceAnswer(record: ServiceRecord): string {
  const requirements = record.requirements?.length
    ? `Requirements:\n${record.requirements
        .map(requirement =>
          requirement.notes
            ? `- ${requirement.name}: ${requirement.notes}`
            : `- ${requirement.name}`
        )
        .join('\n')}`
    : undefined;
  const steps = record.steps?.length
    ? `Steps:\n${record.steps
        .map(step => `${step.number}. ${step.action}`)
        .join('\n')}`
    : undefined;
  const pending = record.pendingFields?.length
    ? `Pending fields: ${record.pendingFields.join(', ')}.`
    : undefined;

  return textParts([
    record.description,
    record.whoMayApply ? `Who may apply: ${record.whoMayApply}` : undefined,
    requirements,
    record.processingTime
      ? `Processing time: ${record.processingTime}`
      : undefined,
    record.fees ? `Fees: ${record.fees}` : undefined,
    steps,
    record.responsibleOffice
      ? `Responsible office: ${record.responsibleOffice}`
      : undefined,
    record.contact ? `Contact: ${record.contact}` : undefined,
    pending,
  ]);
}

function toServiceRecord(record: ServiceRecord): PublicChatRecord {
  return {
    id: `service:${record.slug}`,
    family: 'structured_records',
    title: record.title,
    summary: record.description,
    answerText: serviceAnswer(record),
    searchText: [
      record.title,
      record.category,
      record.classification,
      record.description,
      record.responsibleOffice,
      record.pendingFields?.join(' '),
    ]
      .filter(Boolean)
      .join(' '),
    internalPath: `/services/record/${record.slug}`,
    status: record.status,
    sources: combineSources(record.source, record.relatedSources),
    pendingFields: record.pendingFields,
  };
}

function contactAnchor(category: string): string {
  const anchors: Record<string, string> = {
    Emergency: 'emergency',
    Health: 'health',
    Agriculture: 'agriculture',
    Employment: 'employment',
  };

  return anchors[category] ?? 'emergency';
}

function toContactRecord(record: CivicContact): PublicChatRecord {
  return {
    id: `contact:${record.id}`,
    family: 'structured_records',
    title: record.name,
    summary: record.description ?? record.scope,
    answerText: textParts([
      record.description,
      `Contact: ${record.value}`,
      `Scope: ${record.scope}`,
      record.availability,
    ]),
    searchText: [
      record.name,
      record.category,
      record.value,
      record.description,
      record.scope,
      record.availability,
    ]
      .filter(Boolean)
      .join(' '),
    internalPath: `/contact#${contactAnchor(record.category)}`,
    status: record.status,
    sources: combineSources(record.source),
  };
}

function departmentAnswer(record: DepartmentRecord): string {
  return textParts([
    record.description,
    record.head ? `Responsible person or head: ${record.head}` : undefined,
    record.telephone ? `Telephone: ${record.telephone}` : undefined,
    record.email ? `Email: ${record.email}` : undefined,
    record.scope ? `Scope: ${record.scope}` : undefined,
  ]);
}

function toDepartmentRecord(
  record: DepartmentRecord,
  prefix: 'department' | 'directory'
): PublicChatRecord {
  return {
    id: `${prefix}:${record.slug}`,
    family: 'structured_records',
    title: record.name,
    summary: record.description,
    answerText: departmentAnswer(record),
    searchText: [
      record.name,
      record.description,
      record.head,
      record.telephone,
      record.email,
      record.scope,
    ]
      .filter(Boolean)
      .join(' '),
    internalPath: `/government/directory#${record.slug}`,
    status: record.status,
    sources: combineSources(record.source, record.relatedSources),
  };
}

function toStatisticRecord(record: StatisticRecord): PublicChatRecord {
  const value = record.value === undefined ? undefined : String(record.value);

  return {
    id: `statistic:${record.id}`,
    family: 'structured_records',
    title: record.label,
    summary: record.description,
    answerText: textParts([
      value
        ? `${record.label}: ${value}${record.unit ? ` ${record.unit}` : ''}`
        : record.label,
      record.description,
      `Period: ${record.period}`,
    ]),
    searchText: [
      record.label,
      value,
      record.unit,
      record.period,
      record.description,
    ]
      .filter(Boolean)
      .join(' '),
    internalPath: `/statistics#statistic-${record.id}`,
    status: record.status,
    sources: combineSources(record.source),
  };
}

function toFinancialRecord(record: FinancialSnapshot): PublicChatRecord {
  const metrics = Object.entries(record.metrics)
    .map(
      ([key, value]) =>
        `${key}: ₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
    )
    .join('\n');

  return {
    id: `financial:${record.id}`,
    family: 'structured_records',
    title: `FY ${record.fiscalYear} financial snapshot`,
    summary: record.reviewNote ?? 'Source-backed financial snapshot.',
    answerText: textParts([
      `Fiscal year: ${record.fiscalYear}`,
      metrics,
      `Extracted: ${record.extractionDate}`,
      record.reviewNote,
    ]),
    searchText: `financial receipts expenditures income Lal-lo FY ${record.fiscalYear} ${record.reviewNote ?? ''}`,
    internalPath: '/transparency/financial',
    status: record.status,
    sources: combineSources(record.source),
  };
}

function toUpdateRecord(record: UpdateRecord): PublicChatRecord {
  return {
    id: `update:${record.id}`,
    family: 'official_sources',
    title: record.title,
    summary: record.summary,
    answerText: textParts([
      record.summary,
      record.publishedDate ? `Published: ${record.publishedDate}` : undefined,
    ]),
    searchText: [
      record.title,
      record.type,
      record.summary,
      record.publishedDate,
    ]
      .filter(Boolean)
      .join(' '),
    internalPath: '/updates',
    status: record.status,
    sources: combineSources(record.source),
  };
}

function toHeritageRecord(record: HeritageRecord): PublicChatRecord {
  return {
    id: `heritage:${record.id}`,
    family: 'structured_records',
    title: record.name,
    summary: record.description,
    answerText: textParts([record.description, `Location: ${record.location}`]),
    searchText: [record.name, record.location, record.description].join(' '),
    internalPath: `/heritage#${record.id}`,
    status: record.status,
    sources: combineSources(record.source),
  };
}

function toTransparencyRecord(
  sectionSlug: string,
  record: TransparencyRecord
): PublicChatRecord {
  return {
    id: `transparency:${sectionSlug}:${record.id}`,
    family: 'structured_records',
    title: record.title,
    summary: record.summary,
    answerText: textParts([
      record.summary,
      `Period: ${record.period}`,
      `Authority: ${record.authority}`,
      `Jurisdiction: ${record.jurisdiction}`,
      record.amount ? `Amount: ${record.amount}` : undefined,
      record.projectStatus ? `Status: ${record.projectStatus}` : undefined,
    ]),
    searchText: [
      record.title,
      record.summary,
      record.period,
      record.authority,
      record.jurisdiction,
      record.amount,
      record.projectStatus,
    ]
      .filter(Boolean)
      .join(' '),
    internalPath: `/transparency/${sectionSlug}#transparency-${record.id}`,
    status: record.status,
    sources: combineSources(record.source),
  };
}

function faqRecords(): PublicChatRecord[] {
  return publicChatFaqs.map(faq => ({
    id: `faq:${faq.id}`,
    family: 'faq_policy',
    title: faq.question,
    summary: faq.answer,
    answerText: faq.answer,
    searchText: `${faq.question} ${faq.answer}`,
    internalPath: faq.link?.href ?? '/faq',
    status: 'verified',
    sources: [],
  }));
}

function localGuideRecords(): PublicChatRecord[] {
  return localContentIndex.map(guide => ({
    id: `guide:${guide.id}`,
    family: 'local_guides',
    title: guide.title,
    summary: guide.description,
    answerText: guide.description,
    searchText: [
      guide.title,
      guide.description,
      guide.type,
      guide.category,
      guide.categorySlug,
      guide.slug,
    ].join(' '),
    internalPath: guide.url,
    // The index is an approved BetterLal-lo guide summary, not an official
    // source. Keep external source links empty until a source is reviewed.
    status: 'verified',
    sources: [],
  }));
}

const records: PublicChatRecord[] = [
  ...faqRecords(),
  ...localGuideRecords(),
  ...serviceRecords.map(toServiceRecord),
  ...civicContacts.map(toContactRecord),
  ...departmentRecords.map(record => toDepartmentRecord(record, 'department')),
  ...publicDirectoryRecords.map(record =>
    toDepartmentRecord(record, 'directory')
  ),
  ...statisticRecords.map(toStatisticRecord),
  ...financialSnapshots.map(toFinancialRecord),
  ...updateRecords.map(toUpdateRecord),
  ...heritageRecords.map(toHeritageRecord),
  ...transparencySections.flatMap(section =>
    (section.records ?? []).map(record =>
      toTransparencyRecord(section.slug, record)
    )
  ),
  ...barangayRecords.map(record => ({
    id: `barangay:${record.code}`,
    family: 'structured_records' as const,
    title: record.name,
    summary: `${record.name} is a ${record.classification.toLowerCase()} barangay with a recorded population of ${record.population}.`,
    answerText: textParts([
      `Population: ${record.population}`,
      `Household population: ${record.householdPopulation}`,
      `Households: ${record.households}`,
      `Classification: ${record.classification}`,
    ]),
    searchText: `${record.name} barangay ${record.code} ${record.classification} population households`,
    internalPath: '/statistics#barangays',
    status: 'verified' as const,
    sources: combineSources(record.source),
  })),
];

function familyMatches(
  record: PublicChatRecord,
  family?: ChatSourceFamily
): boolean {
  return !family || record.family === family;
}

export function getPublicChatRecords(): PublicChatRecord[] {
  return records;
}

export function getPublicChatRecord(id: string): PublicChatRecord | undefined {
  return records.find(record => record.id === id);
}

export function getPublicChatCatalog() {
  return records.map(record => ({
    id: record.id,
    family: record.family,
    title: record.title,
    summary: record.summary,
    status: record.status,
  }));
}

export function searchPublicChatRecords(
  query: string,
  family?: ChatSourceFamily,
  limit = 6
): PublicChatRecord[] {
  const terms = query
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/)
    .map(term => term.replace(/[^a-z0-9-]/g, ''))
    .filter(Boolean);

  if (terms.length === 0) return [];

  return records
    .filter(record => familyMatches(record, family))
    .map(record => {
      const haystack = record.searchText.toLowerCase();
      const title = record.title.toLowerCase();
      const matchedTerms = terms.filter(term => haystack.includes(term));
      const titleMatches = terms.filter(term => title.includes(term));
      const score = matchedTerms.length * 2 + titleMatches.length * 3;

      return { record, score };
    })
    .filter(result => result.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(result => result.record);
}

export function languageLabel(language: ChatLanguage): string {
  return language === 'fil' ? 'Filipino' : 'English';
}
