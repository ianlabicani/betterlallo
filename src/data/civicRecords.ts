import type {
  DepartmentRecord,
  LegislationRecord,
  ServiceRecord,
  SourceRecord,
  StatisticRecord,
  TransparencySection,
} from '../types/civic';

export const REVIEW_DATE = '2026-09-21';

const source = (
  label: string,
  url: string,
  status: SourceRecord['status'] = 'pending'
): SourceRecord => ({
  label,
  url,
  lastVerified: REVIEW_DATE,
  status,
});

export const officialSources = {
  psaBarangays: source(
    'Philippine Statistics Authority PSGC: Lal-lo barangays',
    'https://psa.gov.ph/classification/psgc/barangays/0201516000',
    'verified'
  ),
  provincialDirectory: source(
    'Provincial Government of Cagayan municipal directory',
    'https://cagayan.gov.ph/city-and-municipalities/',
    'verified'
  ),
  pdrrmo: source(
    'Cagayan Provincial Disaster Risk Reduction and Management Office',
    'https://pdrrmo.cagayan.gov.ph/',
    'verified'
  ),
  dswd: source(
    'Department of Social Welfare and Development',
    'https://www.dswd.gov.ph/'
  ),
  doh: source('Department of Health', 'https://doh.gov.ph/'),
  deped: source('Department of Education', 'https://www.deped.gov.ph/'),
  dti: source('Department of Trade and Industry', 'https://www.dti.gov.ph/'),
  da: source(
    'Department of Agriculture Regional Field Office II',
    'https://cagayanvalley.da.gov.ph/'
  ),
  dpwh: source(
    'Department of Public Works and Highways',
    'https://www.dpwh.gov.ph/'
  ),
  dhsud: source(
    'Department of Human Settlements and Urban Development',
    'https://dhsud.gov.ph/'
  ),
  emb: source(
    'Environmental Management Bureau Region II',
    'https://r2.emb.gov.ph/'
  ),
  coa: source('Commission on Audit', 'https://www.coa.gov.ph/'),
  dbm: source('Department of Budget and Management', 'https://www.dbm.gov.ph/'),
  philgeps: source(
    'Philippine Government Electronic Procurement System',
    'https://www.philgeps.gov.ph/'
  ),
  ra7160: source(
    'Republic Act No. 7160, Local Government Code',
    'https://lawphil.net/statutes/repacts/ra1991/ra_7160_1991.html'
  ),
};

export const serviceRecords: ServiceRecord[] = [
  {
    slug: 'health-services',
    title: 'Health services',
    category: 'Health',
    classification: 'Public information guide',
    description:
      'Find verified pathways to local health information, facilities, and referral points. Lal-lo-specific requirements, fees, and processing times are still being confirmed.',
    pendingFields: [
      'requirements',
      'processing time',
      'fees',
      'responsible office',
    ],
    source: officialSources.doh,
    status: 'pending',
  },
  {
    slug: 'education-support',
    title: 'Education support',
    category: 'Education',
    classification: 'Public information guide',
    description:
      'A source-first guide for education support and local learning resources. Municipal contacts and application details will be added only after verification.',
    pendingFields: [
      'requirements',
      'processing time',
      'fees',
      'responsible office',
    ],
    source: officialSources.deped,
    status: 'pending',
  },
  {
    slug: 'business-permits',
    title: 'Business permits and registration',
    category: 'Business and livelihood',
    classification: 'Public information guide',
    description:
      'Use this guide to orient a new or existing business toward the correct government office. Lal-lo permit fees, requirements, and service times are pending an official source.',
    pendingFields: [
      'requirements',
      'processing time',
      'fees',
      'responsible office',
    ],
    source: officialSources.dti,
    status: 'pending',
  },
  {
    slug: 'social-welfare-assistance',
    title: 'Social welfare assistance',
    category: 'Social welfare',
    classification: 'Public information guide',
    description:
      'A plain-language entry point for social welfare assistance. Do not rely on this page as a complete checklist until Lal-lo requirements and contacts are published.',
    pendingFields: [
      'requirements',
      'processing time',
      'fees',
      'responsible office',
    ],
    source: officialSources.dswd,
    status: 'pending',
  },
  {
    slug: 'agriculture-support',
    title: 'Agriculture and fisheries support',
    category: 'Agriculture and fisheries',
    classification: 'Public information guide',
    description:
      'A source-first guide to agricultural support and referrals relevant to Lal-lo. Program eligibility and municipal contacts remain pending verification.',
    pendingFields: [
      'eligibility',
      'requirements',
      'processing time',
      'responsible office',
    ],
    source: officialSources.da,
    status: 'pending',
  },
  {
    slug: 'infrastructure-reports',
    title: 'Infrastructure and public works',
    category: 'Infrastructure and public works',
    classification: 'Public information guide',
    description:
      'Find source links for public works and infrastructure information. No project status or completion claim is published here without a verifiable record.',
    pendingFields: ['responsible office', 'contact', 'project records'],
    source: officialSources.dpwh,
    status: 'pending',
  },
  {
    slug: 'waste-services',
    title: 'Waste and environmental services',
    category: 'Environment and waste',
    classification: 'Public information guide',
    description:
      'A guide to environmental information and waste-service questions. Collection schedules, fees, and local contacts are pending verification.',
    pendingFields: [
      'requirements',
      'processing time',
      'fees',
      'responsible office',
    ],
    source: officialSources.emb,
    status: 'pending',
  },
  {
    slug: 'emergency-information',
    title: 'Emergency and disaster preparedness',
    category: 'Disaster preparedness',
    classification: 'Public information guide',
    description:
      'Start with verified provincial disaster-preparedness information and the published Cagayan PDRRMO channels. Local emergency contacts should be confirmed before use.',
    pendingFields: [
      'Lal-lo municipal hotlines',
      'responsible office',
      'local procedures',
    ],
    source: officialSources.pdrrmo,
    status: 'pending',
  },
  {
    slug: 'permits-and-land-use',
    title: 'Permits and land use',
    category: 'Housing and land use',
    classification: 'Public information guide',
    description:
      'A source-first starting point for building, land-use, and related permit questions. Lal-lo requirements, fees, and processing times are not published until verified.',
    pendingFields: [
      'requirements',
      'processing time',
      'fees',
      'responsible office',
    ],
    source: officialSources.dhsud,
    status: 'pending',
  },
];

const pendingDepartmentSource = source(
  'Municipality of Lal-lo office directory: verification target',
  'https://cagayan.gov.ph/city-and-municipalities/',
  'pending'
);

export const departmentRecords: DepartmentRecord[] = [
  {
    slug: 'office-of-the-mayor',
    name: 'Office of the Mayor',
    description:
      'The municipal executive office listed in the Provincial Government of Cagayan directory.',
    head: 'Hon. Oliver Pascual',
    source: officialSources.provincialDirectory,
    status: 'verified',
  },
  {
    slug: 'sangguniang-bayan',
    name: 'Sangguniang Bayan',
    description:
      'The municipal legislative body. Lal-lo-specific office details and contact channels are pending publication.',
    source: source(
      'Local Government Code, municipal legislative framework',
      officialSources.ra7160.url,
      'pending'
    ),
    status: 'pending',
  },
  ...[
    ['municipal-health-office', 'Municipal Health Office'],
    ['business-permits-and-licensing', 'Business Permits and Licensing Office'],
    [
      'municipal-social-welfare',
      'Municipal Social Welfare and Development Office',
    ],
    ['municipal-agriculture', 'Municipal Agriculture Office'],
    ['municipal-engineering', 'Municipal Engineering Office'],
    ['municipal-planning', 'Municipal Planning and Development Office'],
    [
      'municipal-environment',
      'Municipal Environment and Natural Resources Office',
    ],
    [
      'municipal-disaster-risk-reduction',
      'Municipal Disaster Risk Reduction and Management Office',
    ],
    ['municipal-treasurer', 'Municipal Treasurer’s Office'],
    ['civil-registrar', 'Municipal Civil Registrar’s Office'],
    ['municipal-assessor', 'Municipal Assessor’s Office'],
    ['public-employment-service', 'Public Employment Service Office'],
  ].map(([slug, name]) => ({
    slug,
    name,
    description:
      'Office profile, responsible personnel, and contact details pending verification from an official Lal-lo publication.',
    source: pendingDepartmentSource,
    status: 'pending' as const,
  })),
];

export const statisticRecords: StatisticRecord[] = [
  {
    id: 'barangays',
    label: 'Barangays',
    value: 35,
    unit: 'barangays',
    period: 'PSGC listing reviewed 2026-09-21',
    description: 'The current PSA PSGC page lists 35 barangays for Lal-lo.',
    source: officialSources.psaBarangays,
    status: 'verified',
  },
  {
    id: 'population',
    label: 'Population profile',
    period: 'Pending official snapshot',
    description:
      'Population, household, and demographic figures will be published with their PSA reference year.',
    source: officialSources.psaBarangays,
    status: 'pending',
  },
  {
    id: 'municipal-income',
    label: 'Municipal income',
    period: 'Pending official snapshot',
    description:
      'Income-class and revenue indicators require a dated DBM or other primary government record.',
    source: officialSources.dbm,
    status: 'pending',
  },
  {
    id: 'budget',
    label: 'Budget indicators',
    period: 'Pending official snapshot',
    description:
      'Budget and expenditure indicators will be added from dated, Lal-lo-specific public records.',
    source: officialSources.coa,
    status: 'pending',
  },
  {
    id: 'development',
    label: 'Competitiveness and development',
    period: 'Pending official snapshot',
    description:
      'Development indicators will be shown only when an official dataset identifies Lal-lo and its reporting period.',
    source: source(
      'Department of the Interior and Local Government',
      'https://www.dilg.gov.ph/'
    ),
    status: 'pending',
  },
];

export const legislationRecords: LegislationRecord[] = [];

export const transparencySections: TransparencySection[] = [
  {
    slug: 'financial',
    title: 'Financial records',
    description:
      'Budget, expenditure, audit, and financial-management records for Lal-lo.',
    summary:
      'Lal-lo-specific financial records are pending a verified publication or direct document link.',
    sources: [officialSources.coa, officialSources.dbm],
    status: 'pending',
  },
  {
    slug: 'procurement',
    title: 'Procurement',
    description:
      'Public procurement notices, awards, and related source documents.',
    summary:
      'Procurement records are pending a verified Lal-lo-specific source or PhilGEPS record set.',
    sources: [officialSources.philgeps],
    status: 'pending',
  },
  {
    slug: 'infrastructure',
    title: 'Projects and infrastructure',
    description:
      'Infrastructure project status, funding, implementing office, and source documents.',
    summary:
      'No project status is asserted until a dated, source-backed Lal-lo record is available.',
    sources: [
      officialSources.dpwh,
      officialSources.coa,
      officialSources.philgeps,
    ],
    status: 'pending',
  },
];
