export type LocalContentType = 'service' | 'government';

export interface LocalContentIndexEntry {
  id: string;
  title: string;
  description: string;
  type: LocalContentType;
  category: string;
  categorySlug: string;
  slug: string;
  url: string;
}

/**
 * Server-safe metadata for the markdown content index. Keep this projection
 * bounded: the chat may summarize it, but it must not receive raw documents.
 */
export const localContentIndex: LocalContentIndexEntry[] = [
  {
    id: 'government-barangays-directory',
    title: 'Barangay directory',
    description:
      'The Philippine Statistics Authority’s current PSGC profile lists 35 barangays in the Municipality of Lal-lo. The 2024 population and household columns come from the PSA OpenSTAT 2024 Census of Population table for the Lal-lo PSGC codes.',
    type: 'government',
    category: 'Barangays',
    categorySlug: 'barangays',
    slug: 'directory',
    url: '/government/barangays/directory',
  },
  {
    id: 'government-departments-executive',
    title: 'Executive Department',
    description:
      'The executive branch of the Municipality of Lal-lo is led by the Municipal Mayor and includes the municipal offices that deliver local programs and services.',
    type: 'government',
    category: 'Departments',
    categorySlug: 'departments',
    slug: 'executive',
    url: '/government/departments/executive',
  },
  {
    id: 'government-departments-legislative',
    title: 'Legislative Department',
    description:
      'The Sangguniang Bayan is the municipal legislative body of Lal-lo. It considers local ordinances and resolutions and performs the legislative functions assigned to municipalities under Philippine local-government law.',
    type: 'government',
    category: 'Departments',
    categorySlug: 'departments',
    slug: 'legislative',
    url: '/government/departments/legislative',
  },
  {
    id: 'government-overview-about-lallo',
    title: 'About Lal-lo',
    description:
      'Lal-lo is a municipality in the province of Cagayan, in the Cagayan Valley (Region II). BetterLal-lo is an independent community project that organizes public information about the municipality for residents, visitors, and local civic groups.',
    type: 'government',
    category: 'Overview',
    categorySlug: 'overview',
    slug: 'about-lallo',
    url: '/government/overview/about-lallo',
  },
  {
    id: 'government-overview-data-sources',
    title: 'Public information sources',
    description:
      'BetterLal-lo uses a source-first workflow. A page should tell readers what it is based on, and an update date should be added whenever a contributor checks a record. Published records are repository-managed snapshots, not a live municipal database.',
    type: 'government',
    category: 'Overview',
    categorySlug: 'overview',
    slug: 'data-sources',
    url: '/government/overview/data-sources',
  },
  {
    id: 'government-transparency-budget',
    title: 'Budget and financial records',
    description:
      'The financial dashboard publishes verified annual Statement of Receipts and Expenditures snapshots from the Bureau of Local Government Finance (BLGF) for FY2023-FY2025. These are reported financial records, not an audit opinion or an approved-budget statement.',
    type: 'government',
    category: 'Transparency',
    categorySlug: 'transparency',
    slug: 'budget',
    url: '/government/transparency/budget',
  },
  {
    id: 'government-transparency-ordinances',
    title: 'Ordinances and resolutions',
    description:
      'Municipal ordinances and resolutions should be read from an official copy issued by the Sangguniang Bayan, Municipal Secretary, or another authorized government source.',
    type: 'government',
    category: 'Transparency',
    categorySlug: 'transparency',
    slug: 'ordinances',
    url: '/government/transparency/ordinances',
  },
  {
    id: 'government-transparency-projects',
    title: 'Projects and procurement',
    description:
      'Project information is most useful when residents can connect the project name to its location, budget, implementing office, contractor or partner, status, and official procurement record.',
    type: 'government',
    category: 'Transparency',
    categorySlug: 'transparency',
    slug: 'projects',
    url: '/government/transparency/projects',
  },
  {
    id: 'service-agriculture-fisheries-agriculture-support',
    title: 'Find Agriculture and Fisheries Support',
    description:
      'Residents, farmers, and fisherfolk can use this guide to identify the right office for agricultural inputs, livestock concerns, fisheries support, training, and livelihood assistance in Lal-lo.',
    type: 'service',
    category: 'Agriculture Fisheries',
    categorySlug: 'agriculture-fisheries',
    slug: 'agriculture-support',
    url: '/services/agriculture-fisheries/agriculture-support',
  },
  {
    id: 'service-barangay-services-barangay-clearance',
    title: 'Barangay Clearance',
    description:
      'Barangay clearance requirements and fees can differ by purpose and barangay. Confirm the issuing barangay, current application form, identity or residency documents, fee, payment method, and release time directly with the barangay.',
    type: 'service',
    category: 'Barangay Services',
    categorySlug: 'barangay-services',
    slug: 'barangay-clearance',
    url: '/services/barangay-services/barangay-clearance',
  },
  {
    id: 'service-business-business-permits',
    title: 'Business Permits and BPLO',
    description:
      'Business permit requirements depend on the business activity, location, ownership, and the current municipal process. Use this checklist to prepare questions for the Municipal Business Permits and Licensing Office (BPLO) and your barangay.',
    type: 'service',
    category: 'Business',
    categorySlug: 'business',
    slug: 'business-permits',
    url: '/services/business/business-permits',
  },
  {
    id: 'service-certificates-civil-registry',
    title: 'Civil Registry and Certificates',
    description:
      'Use this page to identify the right civil-registry record channel before requesting a certificate. The current local registrar contact, fees, documentary requirements, release times, and appointment process are not published here until a current Lal-lo source is reviewed.',
    type: 'service',
    category: 'Certificates',
    categorySlug: 'certificates',
    slug: 'civil-registry',
    url: '/services/certificates/civil-registry',
  },
  {
    id: 'service-disaster-preparedness-emergency-information',
    title: 'Emergency Information and Disaster Preparedness',
    description:
      'For immediate danger, contact the appropriate emergency responder first. Do not wait for this portal to load or rely on an old number if an official responder, barangay, or local emergency channel provides a current instruction.',
    type: 'service',
    category: 'Disaster Preparedness',
    categorySlug: 'disaster-preparedness',
    slug: 'emergency-information',
    url: '/services/disaster-preparedness/emergency-information',
  },
  {
    id: 'service-education-education-support',
    title: 'Find Education Support and Scholarships',
    description:
      'Education assistance changes by school year, funding source, and program call. Use this guide to find the current announcement instead of relying on an old deadline or a recycled social-media post.',
    type: 'service',
    category: 'Education',
    categorySlug: 'education',
    slug: 'education-support',
    url: '/services/education/education-support',
  },
  {
    id: 'service-environment-environment-programs',
    title: 'Find Environmental Programs and Reporting Channels',
    description:
      'Environmental programs and enforcement channels depend on the concern and the responsible office. Start with the barangay or municipal environment office, then ask which agency has jurisdiction.',
    type: 'service',
    category: 'Environment',
    categorySlug: 'environment',
    slug: 'environment-programs',
    url: '/services/environment/environment-programs',
  },
  {
    id: 'service-garbage-waste-disposal-waste-services',
    title: 'Waste Collection, Segregation, and Reporting',
    description:
      'Collection schedules and special pickup arrangements may differ by barangay. Ask your barangay or the municipal environment office for the current schedule and receiving channel before leaving waste outside a collection window.',
    type: 'service',
    category: 'Garbage Waste Disposal',
    categorySlug: 'garbage-waste-disposal',
    slug: 'waste-services',
    url: '/services/garbage-waste-disposal/waste-services',
  },
  {
    id: 'service-health-services-find-health-services',
    title: 'Find Health Services and Referrals',
    description:
      'For a life-threatening emergency, use the current emergency-response channel or go to the nearest emergency facility. For routine care, start with the local health office or barangay health station and ask what service is available today.',
    type: 'service',
    category: 'Health Services',
    categorySlug: 'health-services',
    slug: 'find-health-services',
    url: '/services/health-services/find-health-services',
  },
  {
    id: 'service-housing-land-use-permits-and-land-use',
    title: 'Confirm Land-Use, Zoning, and Building Requirements',
    description:
      'Before buying materials, starting construction, or changing a property’s use, ask the Municipality of Lal-lo which office should review the proposal. The applicable requirements may involve zoning or land use, building permits, occupancy, environmental rules, fire safety, and barangay clearances.',
    type: 'service',
    category: 'Housing Land Use',
    categorySlug: 'housing-land-use',
    slug: 'permits-and-land-use',
    url: '/services/housing-land-use/permits-and-land-use',
  },
  {
    id: 'service-infrastructure-public-works-infrastructure-reports',
    title: 'Report an Infrastructure Concern',
    description:
      'Use the barangay as the first receiving point for a local road, bridge, drainage, water, streetlight, or public-facility concern unless an active emergency requires the disaster-response channel.',
    type: 'service',
    category: 'Infrastructure Public Works',
    categorySlug: 'infrastructure-public-works',
    slug: 'infrastructure-reports',
    url: '/services/infrastructure-public-works/infrastructure-reports',
  },
  {
    id: 'service-social-welfare-senior-pwd-assistance',
    title: 'Senior Citizen and PWD Assistance',
    description:
      'Older persons and persons with disabilities may need different registration, identification, assistance, or referral channels. Confirm the current Lal-lo office, program call, documentary requirements, assessment process, fees, and release schedule before preparing copies or traveling.',
    type: 'service',
    category: 'Social Welfare',
    categorySlug: 'social-welfare',
    slug: 'senior-pwd-assistance',
    url: '/services/social-welfare/senior-pwd-assistance',
  },
  {
    id: 'service-social-welfare-social-welfare-assistance',
    title: 'Find Social Welfare Assistance',
    description:
      'The right assistance channel depends on the person’s situation and the current program call. Start with the Municipal Social Welfare and Development Office (MSWDO) or your barangay and ask for a current assessment.',
    type: 'service',
    category: 'Social Welfare',
    categorySlug: 'social-welfare',
    slug: 'social-welfare-assistance',
    url: '/services/social-welfare/social-welfare-assistance',
  },
  {
    id: 'service-tax-payments-tax-payments',
    title: 'Municipal and Real Property Tax Payments',
    description:
      'Municipal taxes and real property tax assessments should be confirmed with the appropriate Lal-lo office before payment. Current assessment rules, rates, penalties, due dates, documentary requirements, office hours, payment channels, and online links are not published here without a current official source.',
    type: 'service',
    category: 'Tax Payments',
    categorySlug: 'tax-payments',
    slug: 'tax-payments',
    url: '/services/tax-payments/tax-payments',
  },
];
