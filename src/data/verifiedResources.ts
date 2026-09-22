import type {
  CivicContact,
  DepartmentRecord,
  ResourceCollectionLink,
  ServiceRecord,
  SourceRecord,
  StatisticRecord,
  TransparencyRecord,
  UpdateRecord,
  VerifiedResourceEntry,
  VerifiedResourceGroup,
  VerificationStatus,
} from '../types/civic';
import {
  barangayRecords,
  civicContacts,
  departmentRecords,
  financialSnapshots,
  heritageRecords,
  legislationRecords,
  onlineServiceLinks,
  publicDirectoryRecords,
  serviceRecords,
  statisticRecords,
  transparencySections,
  updateRecords,
} from './civicRecords';

function isVerifiedRecord(record: {
  status: VerificationStatus;
  source: SourceRecord;
}) {
  return record.status === 'verified' && record.source.status === 'verified';
}

function verifiedRecords<
  T extends { status: VerificationStatus; source: SourceRecord },
>(records: T[]) {
  return records.filter(isVerifiedRecord);
}

function internalCollection(
  id: string,
  label: string,
  description: string,
  href: string
): ResourceCollectionLink {
  return { id, label, description, href, linkType: 'internal' };
}

function phoneHref(value: string) {
  const firstNumber = value.split('/')[0]?.trim() ?? value;
  return `tel:${firstNumber.replace(/[^+\d]/g, '')}`;
}

function contactHref(contact: CivicContact) {
  if (contact.channel === 'phone') return phoneHref(contact.value);
  if (contact.channel === 'email') return `mailto:${contact.value}`;
  return contact.value;
}

function contactLinkType(contact: CivicContact) {
  if (contact.channel === 'phone') return 'phone' as const;
  if (contact.channel === 'email') return 'email' as const;
  return 'external' as const;
}

const contactAnchors: Record<string, string> = {
  Emergency: 'emergency',
  Health: 'health',
  Agriculture: 'agriculture',
  Employment: 'employment',
};

const contactResources: VerifiedResourceEntry[] = verifiedRecords(
  civicContacts
).map(contact => ({
  id: `contact-${contact.id}`,
  group: 'contacts',
  title: contact.name,
  description: contact.description ?? contact.scope,
  href: contactHref(contact),
  linkType: contactLinkType(contact),
  actionLabel:
    contact.channel === 'phone'
      ? `Call ${contact.value}`
      : contact.channel === 'email'
        ? `Email ${contact.value}`
        : 'Open contact website',
  portalHref: `/contact#${contactAnchors[contact.category] ?? 'emergency'}`,
  portalLabel: 'View contact details',
  source: contact.source,
  status: contact.status,
}));

const serviceResources: VerifiedResourceEntry[] = verifiedRecords(
  serviceRecords
).map(record => serviceEntry(record));

function serviceEntry(record: ServiceRecord): VerifiedResourceEntry {
  return {
    id: `service-${record.slug}`,
    group: 'services',
    title: record.title,
    description: record.description,
    href: `/services/record/${record.slug}`,
    linkType: 'internal',
    actionLabel: 'View service record',
    source: record.source,
    status: record.status,
  };
}

const governmentResources: VerifiedResourceEntry[] = [
  ...verifiedRecords(departmentRecords).map(record => directoryEntry(record)),
  ...verifiedRecords(publicDirectoryRecords).map(record =>
    directoryEntry(record)
  ),
];

function directoryEntry(record: DepartmentRecord): VerifiedResourceEntry {
  return {
    id: `directory-${record.slug}`,
    group: 'government',
    title: record.name,
    description: record.description,
    href: `/government/directory#${record.slug}`,
    linkType: 'internal',
    actionLabel: 'Open directory record',
    source: record.source,
    status: record.status,
  };
}

const transparencyResources: VerifiedResourceEntry[] =
  transparencySections.flatMap(section =>
    (section.records ?? [])
      .filter(isVerifiedRecord)
      .map(record => transparencyEntry(section.slug, record))
  );

function transparencyEntry(
  section: string,
  record: TransparencyRecord
): VerifiedResourceEntry {
  return {
    id: `transparency-${record.id}`,
    group: 'records',
    title: record.title,
    description: record.summary,
    href: `/transparency/${section}#transparency-${record.id}`,
    linkType: 'internal',
    actionLabel: 'View public record',
    source: record.source,
    status: record.status,
  };
}

const statisticResources: VerifiedResourceEntry[] = verifiedRecords(
  statisticRecords
).map(record => statisticEntry(record));

function statisticEntry(record: StatisticRecord): VerifiedResourceEntry {
  return {
    id: `statistic-${record.id}`,
    group: 'data',
    title: record.label,
    description: record.description,
    href: `/statistics#statistic-${record.id}`,
    linkType: 'internal',
    actionLabel: 'View statistic',
    source: record.source,
    status: record.status,
  };
}

const financialResources: VerifiedResourceEntry[] = verifiedRecords(
  financialSnapshots
).map(snapshot => ({
  id: `financial-${snapshot.id}`,
  group: 'data',
  title: `FY ${snapshot.fiscalYear} financial snapshot`,
  description: `Verified BLGF Statement of Receipts and Expenditures snapshot for fiscal year ${snapshot.fiscalYear}.`,
  href: `/statistics#financial-${snapshot.id}`,
  linkType: 'internal',
  actionLabel: 'View financial snapshot',
  source: snapshot.source,
  status: snapshot.status,
}));

const barangayResource: VerifiedResourceEntry[] =
  barangayRecords[0]?.source.status === 'verified'
    ? [
        {
          id: 'barangay-population',
          group: 'data',
          title: 'Population by barangay',
          description: `Verified 2024 population and household data for ${barangayRecords.length} Lal-lo barangays.`,
          href: '/statistics#barangay-population-heading',
          linkType: 'internal',
          actionLabel: 'View barangay data',
          source: barangayRecords[0].source,
          status: barangayRecords[0].source.status,
        },
      ]
    : [];

const heritageResources: VerifiedResourceEntry[] = verifiedRecords(
  heritageRecords
).map(record => ({
  id: `heritage-${record.id}`,
  group: 'heritage',
  title: record.name,
  description: record.description,
  href: `/heritage#${record.id}`,
  linkType: 'internal',
  actionLabel: 'View heritage record',
  source: record.source,
  status: record.status,
}));

const updateResources: VerifiedResourceEntry[] = verifiedRecords(
  updateRecords
).map((record: UpdateRecord) => ({
  id: `update-${record.id}`,
  group: 'updates',
  title: record.title,
  description: record.summary,
  href: record.href,
  linkType: record.href.startsWith('/')
    ? ('internal' as const)
    : ('external' as const),
  actionLabel: record.href.startsWith('/') ? 'Read update' : 'Open source',
  source: record.source,
  status: record.status,
}));

export const verifiedResourceGroups: VerifiedResourceGroup[] = [
  {
    id: 'contacts',
    title: 'Contacts and hotlines',
    description:
      'Reach verified emergency, health, agriculture, and employment contacts quickly.',
    collectionLinks: [
      internalCollection(
        'contact-hub',
        'Open contact hub',
        'See complete contact information and source details.',
        '/contact'
      ),
      internalCollection(
        'emergency-contacts',
        'Emergency contacts',
        'Jump directly to verified disaster-response channels.',
        '/contact#emergency'
      ),
    ],
    resources: contactResources,
    pendingMessage:
      contactResources.length === 0
        ? 'No verified contact records have been published yet.'
        : undefined,
  },
  {
    id: 'services',
    title: 'Services and forms',
    description:
      'Start with source-backed service records and practical guides for common needs.',
    collectionLinks: [
      internalCollection(
        'all-services',
        'Browse all service guides',
        'See the full service directory and pending fields.',
        '/services'
      ),
      internalCollection(
        'certificates',
        'Certificates and vital records',
        'Open the civil-registry service guide.',
        '/services/certificates'
      ),
      internalCollection(
        'tax-payments',
        'Tax payments',
        'Open the source-first tax-payment guide.',
        '/services/tax-payments'
      ),
      internalCollection(
        'barangay-services',
        'Barangay services',
        'Open barangay-clearance and related guidance.',
        '/services/barangay-services'
      ),
    ],
    resources: serviceResources,
    pendingMessage:
      onlineServiceLinks.length === 0
        ? 'Some service guides and Lal-lo-specific online application or payment links remain pending source review.'
        : 'Some service guides remain pending source review.',
  },
  {
    id: 'government',
    title: 'Government and offices',
    description:
      'Find verified public-office records while keeping provincial, national, and municipal scope clear.',
    collectionLinks: [
      internalCollection(
        'government-directory',
        'Open government directory',
        'Search municipal offices and verified public-agency records.',
        '/government/directory'
      ),
      internalCollection(
        'elected-officials',
        'Elected officials',
        'View source-backed official names and roles.',
        '/government/officials'
      ),
      internalCollection(
        'government-departments',
        'Government departments',
        'Browse the department and public-record categories.',
        '/government/departments'
      ),
    ],
    resources: governmentResources,
    pendingMessage:
      'Additional municipal office profiles remain pending a direct Lal-lo publication.',
  },
  {
    id: 'records',
    title: 'Public records and transparency',
    description:
      'Open verified financial, procurement, infrastructure, and public-record entries.',
    collectionLinks: [
      internalCollection(
        'transparency-hub',
        'Open transparency',
        'Choose financial, procurement, or infrastructure records.',
        '/transparency'
      ),
      internalCollection(
        'openlgu',
        'OpenLGU legislation',
        'Check the legislation register and its current data status.',
        '/openlgu'
      ),
    ],
    resources: transparencyResources,
    pendingMessage:
      legislationRecords.length === 0
        ? 'The legislation register and Lal-lo-specific full-disclosure document URLs are not verified yet.'
        : undefined,
  },
  {
    id: 'data',
    title: 'Statistics and data',
    description:
      'Review dated population, barangay, and financial indicators with direct links to the dashboard.',
    collectionLinks: [
      internalCollection(
        'statistics-dashboard',
        'Open statistics dashboard',
        'See the full metric register, barangay table, and financial trend.',
        '/statistics'
      ),
    ],
    resources: [
      ...statisticResources,
      ...financialResources,
      ...barangayResource,
    ],
  },
  {
    id: 'heritage',
    title: 'Heritage and tourism',
    description:
      'Browse source-backed heritage references without inferred visitor details.',
    collectionLinks: [
      internalCollection(
        'heritage-hub',
        'Open heritage and tourism',
        'See places, historical references, and visitor-information limits.',
        '/heritage'
      ),
    ],
    resources: heritageResources,
    pendingMessage:
      heritageResources.length === 0
        ? 'No verified heritage records have been published yet.'
        : undefined,
  },
  {
    id: 'updates',
    title: 'Updates and advisories',
    description:
      'See dated public information and announcements with a visible source.',
    collectionLinks: [
      internalCollection(
        'updates-hub',
        'Open all updates',
        'Read the full source-backed update feed.',
        '/updates'
      ),
    ],
    resources: updateResources,
    pendingMessage:
      updateResources.length === 0
        ? 'No source-backed updates have been published yet.'
        : undefined,
  },
  {
    id: 'help',
    title: 'Help and contribution',
    description:
      'Learn how the portal works, suggest corrections, and review accessibility information.',
    collectionLinks: [
      internalCollection(
        'faq',
        'Frequently asked questions',
        'Learn what BetterLal-lo publishes and what remains pending.',
        '/faq'
      ),
      internalCollection(
        'contribute',
        'Suggest a correction',
        'Submit a source or correction for GitHub review.',
        '/contribute'
      ),
      internalCollection(
        'accessibility',
        'Accessibility',
        'Review the portal’s accessibility commitments and known limits.',
        '/accessibility'
      ),
      internalCollection(
        'verification-method',
        'How information is verified',
        'Read the portal’s source and verification approach.',
        '/government/overview/about-lallo'
      ),
    ],
    resources: [],
  },
];
