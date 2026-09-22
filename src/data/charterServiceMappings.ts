import { serviceRecords } from './civicRecords';
import type { ServiceRecord } from '../types/civic';

export interface CharterServicePageDefinition {
  slug: string;
  name: string;
  category: string;
}

export const charterServicePageDefinitions: CharterServicePageDefinition[] = [
  {
    slug: 'charter-2026-mayor-and-municipal-services',
    name: 'Mayor and municipal services',
    category: 'Mayor and municipal services',
  },
  {
    slug: 'charter-2026-human-resources',
    name: 'Human resources',
    category: 'Human resources',
  },
  {
    slug: 'charter-2026-youth-development',
    name: 'Youth development',
    category: 'Youth development',
  },
  {
    slug: 'charter-2026-population-services',
    name: 'Population services',
    category: 'Population services',
  },
  {
    slug: 'charter-2026-disability-affairs',
    name: 'Disability affairs',
    category: 'Disability affairs',
  },
  {
    slug: 'charter-2026-public-information',
    name: 'Public information',
    category: 'Public information',
  },
  {
    slug: 'charter-2026-business-permits',
    name: 'Business permits',
    category: 'Business permits',
  },
  {
    slug: 'charter-2026-legislative-services',
    name: 'Legislative services',
    category: 'Legislative services',
  },
  {
    slug: 'charter-2026-treasury-and-taxation',
    name: 'Treasury and taxation',
    category: 'Treasury and taxation',
  },
  {
    slug: 'charter-2026-civil-registry',
    name: 'Civil registry',
    category: 'Civil registry',
  },
  {
    slug: 'charter-2026-health-services',
    name: 'Health services',
    category: 'Health services',
  },
  {
    slug: 'charter-2026-planning-and-zoning',
    name: 'Planning and zoning',
    category: 'Planning and zoning',
  },
  {
    slug: 'charter-2026-environment-and-waste',
    name: 'Environment and waste',
    category: 'Environment and waste',
  },
  {
    slug: 'charter-2026-disaster-preparedness',
    name: 'Disaster preparedness',
    category: 'Disaster preparedness',
  },
  {
    slug: 'charter-2026-agriculture-and-cooperatives',
    name: 'Agriculture and cooperatives',
    category: 'Agriculture and cooperatives',
  },
  {
    slug: 'charter-2026-property-assessment',
    name: 'Property assessment',
    category: 'Property assessment',
  },
  {
    slug: 'charter-2026-budget-and-appropriations',
    name: 'Budget and appropriations',
    category: 'Budget and appropriations',
  },
  {
    slug: 'charter-2026-accounting-services',
    name: 'Accounting services',
    category: 'Accounting services',
  },
  {
    slug: 'charter-2026-general-services',
    name: 'General services',
    category: 'General services',
  },
  {
    slug: 'charter-2026-social-welfare',
    name: 'Social welfare',
    category: 'Social welfare',
  },
  {
    slug: 'charter-2026-engineering-and-building-permits',
    name: 'Engineering and building permits',
    category: 'Engineering and building permits',
  },
  {
    slug: 'charter-2026-tourism-services',
    name: 'Tourism services',
    category: 'Tourism services',
  },
  {
    slug: 'charter-2026-municipal-administration',
    name: 'Municipal administration',
    category: 'Municipal administration',
  },
];

const categoryMappings: Record<string, string[]> = {
  'citizens-charter-2026': charterServicePageDefinitions.map(
    definition => definition.category
  ),
  business: ['Business permits'],
  certificates: ['Civil registry'],
  'health-services': ['Health services'],
  'social-welfare': ['Social welfare'],
  'agriculture-fisheries': ['Agriculture and cooperatives'],
  'housing-land-use': [
    'Planning and zoning',
    'Engineering and building permits',
  ],
  'garbage-waste-disposal': ['Environment and waste'],
  environment: ['Environment and waste'],
  'disaster-preparedness': ['Disaster preparedness'],
  'tax-payments': ['Treasury and taxation', 'Property assessment'],
};

const pageMappings: Record<string, string[]> = {
  ...Object.fromEntries(
    charterServicePageDefinitions.map(definition => [
      `citizens-charter-2026/${definition.slug}`,
      [definition.category],
    ])
  ),
  'social-welfare/senior-pwd-assistance': [
    'Disability affairs',
    'Health services',
  ],
};

export function getCharterProcedurePageTitle(
  categorySlug: string,
  documentSlug?: string
): string | undefined {
  if (categorySlug !== 'citizens-charter-2026' || !documentSlug) {
    return undefined;
  }

  return charterServicePageDefinitions.find(
    definition => definition.slug === documentSlug
  )?.name;
}

function pageNumber(record: ServiceRecord): number {
  const firstPage = record.charterPages?.match(/\d+/)?.[0];
  return firstPage ? Number(firstPage) : Number.MAX_SAFE_INTEGER;
}

export function getCharterProcedureRecords(
  categorySlug: string,
  documentSlug?: string
): ServiceRecord[] {
  const mappingKey = documentSlug
    ? `${categorySlug}/${documentSlug}`
    : categorySlug;
  const categories = pageMappings[mappingKey] ?? categoryMappings[categorySlug];

  if (!categories) return [];

  return serviceRecords
    .filter(
      record =>
        record.recordKind === 'charter-procedure' &&
        categories.includes(record.category)
    )
    .sort((left, right) => pageNumber(left) - pageNumber(right));
}
