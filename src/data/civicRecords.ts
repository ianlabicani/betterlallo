import type {
  DepartmentRecord,
  FdpDocumentRecord,
  FinancialSnapshot,
  LegislationRecord,
  ServiceRecord,
  SourceRecord,
  StatisticRecord,
  TransparencySection,
} from '../types/civic';

export const REVIEW_DATE = '2026-09-21';

type SourceOptions = Omit<SourceRecord, 'lastVerified'> & {
  lastVerified?: string;
};

const source = ({ lastVerified = REVIEW_DATE, ...record }: SourceOptions) => ({
  ...record,
  lastVerified,
});

export const officialSources = {
  psaBarangays: source({
    label: 'PSA PSGC: Lal-lo barangays and income class',
    url: 'https://psa.gov.ph/classification/psgc/barangays/0201516000',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan',
    sourceType: 'open-data',
    dataPeriod: 'Current PSGC profile reviewed 2026-09-21',
    verificationNote:
      'The profile lists 35 barangays and identifies Lal-lo as a first-class municipality.',
  }),
  psaPopulation: source({
    label: 'PSA OpenSTAT: 2024 Census of Population',
    url: 'https://openstat.psa.gov.ph/PXWeb/pxweb/en/DB/DB__1A__PO_2024/?tablelist=true',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan (PSGC 0201516000)',
    sourceType: 'open-data',
    publicationDate: '2025-07-31',
    dataPeriod: '2024 POPCEN (01 July 2024)',
    verificationNote:
      'The municipality-level API row reports population, household population, and households for Lal-lo.',
  }),
  psaUrbanity: source({
    label: 'PSA OpenSTAT: urban and rural population, 2024',
    url: 'https://openstat.psa.gov.ph/PXWeb/pxweb/en/DB/DB__1A__PO_2024/?tablelist=true',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan (PSGC 0201516000)',
    sourceType: 'open-data',
    dataPeriod: '2024 POPCEN (01 July 2024)',
    verificationNote:
      'The PSA table reports 6,394 urban residents; the current PSGC profile classifies Magapit as urban and the other 34 barangays as rural.',
  }),
  psaCbms: source({
    label: 'PSA Cagayan: preliminary 2024 CBMS results for Lal-lo',
    url: 'https://rsso02.psa.gov.ph/content/psa-cagayan-presents-preliminary-2024-cbms-results-officials-lal-lo-cagayan',
    status: 'verified',
    authority: 'regional',
    jurisdiction: 'Lal-lo, Cagayan',
    sourceType: 'program-report',
    publicationDate: '2025-07-25',
    dataPeriod: '2024 CBMS preliminary results',
    verificationNote:
      'The release confirms a preliminary results presentation; it is not treated as a final estimate and no unreviewed indicator values are copied into the portal.',
  }),
  provincialDirectory: source({
    label: 'Provincial Government of Cagayan municipal directory',
    url: 'https://cagayan.gov.ph/city-and-municipalities/',
    status: 'verified',
    authority: 'provincial',
    jurisdiction: 'Lal-lo, Cagayan',
    sourceType: 'directory',
    dataPeriod: 'Directory reviewed 2026-09-21',
    verificationNote:
      'The directory lists the Lal-lo mayor as Oliver Pascual but does not publish a phone number or email for the entry.',
  }),
  provincialHeritage: source({
    label: 'Provincial Government of Cagayan: Lal-lo heritage projects',
    url: 'https://cagayan.gov.ph/bagong-tourism-heritage-site-projects-sa-bayan-ng-lal-lo-pormal-nang-pinasinayaan/',
    status: 'verified',
    authority: 'provincial',
    jurisdiction: 'Lal-lo, Cagayan',
    sourceType: 'history',
    publicationDate: '2026-05-08',
    dataPeriod: '2026 provincial publication',
    verificationNote:
      'The article spells the mayor’s name as Florence Oliver Pascual and identifies heritage projects in Tucalana and Centro.',
  }),
  nhcpHistory: source({
    label: 'National Historical Commission of the Philippines registry',
    url: 'https://philhistoricsites.nhcp.gov.ph/registry_database/lalloc-nueva-segovia/',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan',
    sourceType: 'history',
    dataPeriod: 'NHCP registry entry',
    verificationNote:
      'The registry identifies Lalloc-Nueva Segovia / the Diocese of Nueva Segovia as a recognized historical site.',
  }),
  pdrrmo: source({
    label: 'Cagayan PDRRMO: We Care Lal-lo program and contacts',
    url: 'https://pdrrmo.cagayan.gov.ph/we-care-lal-lo-program-municipality-of-lal-lo/',
    status: 'verified',
    authority: 'provincial',
    jurisdiction: 'Lal-lo, Cagayan',
    sourceType: 'directory',
    dataPeriod: 'Program page reviewed 2026-09-21',
    verificationNote:
      'The published program page identifies Lal-lo and the 0927-181-9424 hotline for text or call.',
  }),
  pdrrmoContacts: source({
    label: 'Cagayan PDRRMO official contact page',
    url: 'https://pdrrmo.cagayan.gov.ph/elementor-1303/',
    status: 'verified',
    authority: 'provincial',
    jurisdiction: 'Cagayan PDRRMO and Lal-lo program contact',
    sourceType: 'directory',
    dataPeriod: 'Contact page reviewed 2026-09-21',
    verificationNote:
      'The contact page publishes pdrrmo@cagayan.gov.ph, 0975-434-8083, and the Lal-lo program address context.',
  }),
  dohRhu: source({
    label: 'DOH National TB Program facility directory: Lal-lo RHU',
    url: 'https://ntp.doh.gov.ph/view-facility/?id=6633',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo Rural Health Unit, Centro, Lal-lo, Cagayan',
    sourceType: 'facility-registry',
    dataPeriod: 'Facility directory reviewed 2026-09-21',
    verificationNote:
      'The directory identifies a public Lal-lo RHU iDOTS facility and publishes 0926-477-3278 and rhulallo@yahoo.com.',
  }),
  philhealthRhu: source({
    label: 'PhilHealth CY 2026 accredited Animal Bite Provider list',
    url: 'https://www.philhealth.gov.ph/partners/providers/facilities/accredited/ABPP_053126.pdf',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo Rural Health Unit, Centro, Lal-lo, Cagayan',
    sourceType: 'facility-registry',
    dataPeriod: 'CY 2026 accreditation list',
    verificationNote:
      'The list publishes the RHU address, phone, email, and accreditation period; it does not establish every service or fee offered by the facility.',
  }),
  pcafAgriculture: source({
    label: 'DA/PCAF agriculture and fisheries committee directory',
    url: 'https://pcaf.da.gov.ph/index.php/afc-directory/',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Municipal Agriculture Office, Lal-lo, Cagayan',
    sourceType: 'directory',
    dataPeriod: 'Directory reviewed 2026-09-21',
    verificationNote:
      'The DA/PCAF directory lists William Parec, 0906-634-0992 / 0935-923-2672, and lallo_agricultureoffice@yahoo.com.',
  }),
  citizensCharter: source({
    label: 'Provincial Government of Cagayan Citizens Charter, 2nd edition',
    url: 'https://www.cagayan.gov.ph/wp-content/uploads/2024/04/Provincial-Government-of-Cagayan_CC-2nd-Edition_20240430.pdf',
    status: 'verified',
    authority: 'provincial',
    jurisdiction: 'Provincial Fishery Station - Lal-lo, Catayauan',
    sourceType: 'citizens-charter',
    publicationDate: '2024-04-30',
    dataPeriod: '2024 provincial service standard',
    verificationNote:
      'This is a provincial fishery service operating in Lal-lo, not a municipal permit or municipal fee schedule.',
  }),
  dolePeso: source({
    label: 'DOLE Region II PESO directory',
    url: 'https://www.ble.dole.gov.ph/wp-content/uploads/2023/02/RO2-PESO-DIRECTORY.pdf',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo Public Employment Service Office, Cagayan',
    sourceType: 'directory',
    dataPeriod: '2023 directory snapshot',
    verificationNote:
      'This historical official directory lists Ulysses Jr. Dupaya, 0945-421-8641, and uldupaya09@gmail.com; confirm availability before relying on it.',
  }),
  deped: source({
    label: 'DepEd National Inventory Dashboard: Cagayan schools',
    url: 'https://www.nid.deped.gov.ph/public-dashboard/region/Region%20II/division/Cagayan?page=15',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan schools',
    sourceType: 'directory',
    dataPeriod: 'Public dashboard reviewed 2026-09-21',
    verificationNote:
      'The dashboard supports school-record identification; it does not establish municipal education-assistance requirements.',
  }),
  blgfSreFy2023: source({
    label: 'BLGF Statement of Receipts and Expenditures, FY 2023',
    url: 'https://blgf.gov.ph/wp-content/uploads/2024/09/By-LGU-SRE-2023.xlsx',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-Lo municipality, Cagayan',
    sourceType: 'financial-report',
    extractionDate: '2024-05-28',
    dataPeriod: 'FY 2023 annual SRE',
    verificationNote:
      'The BLGF workbook contains the Lal-Lo municipality row. Values are reported through the BLGF LIFT system from LGU SRE submissions and are not an audit opinion.',
  }),
  blgfSreFy2024: source({
    label: 'BLGF Statement of Receipts and Expenditures, FY 2024',
    url: 'https://blgf.gov.ph/wp-content/uploads/2026/01/By-LGU-SRE-2024.xlsx',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-Lo municipality, Cagayan',
    sourceType: 'financial-report',
    extractionDate: '2025-11-27',
    dataPeriod: 'FY 2024 annual SRE',
    verificationNote:
      'The BLGF workbook contains the Lal-Lo municipality row. Values are reported through the BLGF LIFT system from LGU SRE submissions and are not an audit opinion.',
  }),
  blgfSreFy2025: source({
    label: 'BLGF Statement of Receipts and Expenditures, FY 2025',
    url: 'https://blgf.gov.ph/wp-content/uploads/2026/05/By-LGU-SRE-2025.xlsx',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-Lo municipality, Cagayan',
    sourceType: 'financial-report',
    extractionDate: '2026-03-03',
    dataPeriod: 'FY 2025 annual SRE',
    verificationNote:
      'The BLGF workbook contains the Lal-Lo municipality row. Values are reported through the BLGF LIFT system from LGU SRE submissions and are not an audit opinion.',
  }),
  fullDisclosurePortal: source({
    label: 'DILG Full Disclosure Policy Portal reports',
    url: 'https://fdpp.dilg.gov.ph/fdpp/report',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Philippine local government units; Lal-lo filter available',
    sourceType: 'full-disclosure',
    dataPeriod: 'Portal reviewed 2026-09-21',
    verificationNote:
      'The portal provides public filters for document type, region, province, municipality, period, and quarter. Individual Lal-lo documents are published only after their exact record is reviewed.',
  }),
  dbm: source({
    label: 'DBM Budget of Expenditures and Sources of Financing FY 2026',
    url: 'https://www.dbm.gov.ph/index.php/2026/budget-of-expenditures-and-sources-of-financing-fy-2026',
    status: 'verified',
    authority: 'national',
    jurisdiction:
      'Local Government Units, including Lal-lo where a row is published',
    sourceType: 'budget',
    dataPeriod: 'FY 2024-FY 2026 tables',
    verificationNote:
      'DBM publishes the official F.7-F.9 municipality-table links, but the current PDF text layer exposes higher-level rows rather than a readable Lal-lo row; values need table-layout review before publication.',
  }),
  dbmFy2024: source({
    label: 'DBM F.7: receipts and expenditures by municipalities, FY 2024',
    url: 'https://www.dbm.gov.ph/wp-content/uploads/BESF/BESF2026/F7.pdf',
    status: 'pending',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan row under review',
    sourceType: 'budget',
    dataPeriod: 'FY 2024',
    verificationNote:
      'Official document located, but the current PDF text layer exposes higher-level rows rather than a readable Lal-lo row; review the table layout before publishing amounts.',
  }),
  dbmFy2025: source({
    label: 'DBM F.8: receipts and expenditures by municipalities, FY 2025',
    url: 'https://www.dbm.gov.ph/wp-content/uploads/BESF/BESF2026/F8.pdf',
    status: 'pending',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan row under review',
    sourceType: 'budget',
    dataPeriod: 'FY 2025',
    verificationNote:
      'Official document located, but the current PDF text layer exposes higher-level rows rather than a readable Lal-lo row; review the table layout before publishing amounts.',
  }),
  dbmFy2026: source({
    label: 'DBM F.9: receipts and expenditures by municipalities, FY 2026',
    url: 'https://www.dbm.gov.ph/wp-content/uploads/BESF/BESF2026/F9.pdf',
    status: 'pending',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan row under review',
    sourceType: 'budget',
    dataPeriod: 'FY 2026',
    verificationNote:
      'Official document located, but the current PDF text layer exposes higher-level rows rather than a readable Lal-lo row; review the table layout before publishing amounts.',
  }),
  philgeps: source({
    label: 'PhilGEPS notice 13112765: Municipality of Lal-lo',
    url: 'https://notices.philgeps.gov.ph/GEPSNONPILOT/Tender/PrintableBidNoticeAbstractUI.aspx?refid=13112765',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Municipality of Lal-lo, Cagayan Valley',
    sourceType: 'procurement',
    publicationDate: '2026-07-08',
    dataPeriod: '2026 procurement notice',
    verificationNote:
      'The notice is procuring-entity-provided information on PhilGEPS; it does not prove award, delivery, or completion.',
  }),
  dpwh: source({
    label: 'DPWH FY 2024 Region II annual infrastructure program',
    url: 'https://www.dpwh.gov.ph/dpwh/sites/default/files/gaa2024region02.pdf',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo, Cagayan (national DPWH projects)',
    sourceType: 'project-report',
    dataPeriod: 'FY 2024 program listing',
    verificationNote:
      'These are national DPWH records; they are not presented as municipal-government projects.',
  }),
  cagayanFundReport: source({
    label: 'Provincial Government of Cagayan share-of-LGU fund report',
    url: 'https://cagayan.gov.ph/wp-content/uploads/2024/11/Share-of-LGU.pdf',
    status: 'verified',
    authority: 'provincial',
    jurisdiction: 'Lal-lo, Cagayan (provincial-funded project)',
    sourceType: 'project-report',
    dataPeriod: '2024 provincial fund report',
    verificationNote:
      'The report identifies the funding and program-of-works status; it does not establish completion.',
  }),
  dilg: source({
    label: 'DILG Region II news: Lal-lo SGLGIF project',
    url: 'https://www.region2.dilg.gov.ph/index.php/news',
    status: 'verified',
    authority: 'regional',
    jurisdiction: 'Lal-lo, Cagayan (DILG-funded project)',
    sourceType: 'project-report',
    publicationDate: '2025-06-19',
    dataPeriod: 'FY 2023 SGLGIF report',
    verificationNote:
      'The report describes a DILG-funded Balay Silangan project in Barangay Magapit and its inauguration date.',
  }),
  coaWaterDistrict: source({
    label: 'COA Lal-lo Water District compliance audit report',
    url: 'https://www.coa.gov.ph/wpfd_file/lal-lo-water-district-cagayan-compliance-audit-report-2024/',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Lal-lo Water District (not the municipal government)',
    sourceType: 'audit',
    dataPeriod: '2024 compliance audit',
    verificationNote:
      'This record is explicitly excluded from municipal-government finance summaries.',
  }),
  ra7160: source({
    label: 'Republic Act No. 7160, Local Government Code',
    url: 'https://lawphil.net/statutes/repacts/ra1991/ra_7160_1991.html',
    status: 'verified',
    authority: 'national',
    jurisdiction: 'Philippines - municipal legislative framework',
    sourceType: 'legal-framework',
    dataPeriod: '1991 legal framework',
    verificationNote:
      'The law explains municipal functions but cannot verify a Lal-lo-specific officeholder, ordinance, fee, or contact.',
  }),
  dti: source({
    label: 'Department of Trade and Industry',
    url: 'https://www.dti.gov.ph/',
    status: 'pending',
    authority: 'national',
    jurisdiction: 'Philippines - general agency information',
    sourceType: 'directory',
    verificationNote:
      'A general agency homepage cannot verify Lal-lo municipal permit requirements, fees, or processing time.',
  }),
  dswd: source({
    label: 'Department of Social Welfare and Development',
    url: 'https://www.dswd.gov.ph/',
    status: 'pending',
    authority: 'national',
    jurisdiction: 'Philippines - general agency information',
    sourceType: 'directory',
    verificationNote:
      'A general agency homepage cannot verify Lal-lo-specific assistance requirements or schedules.',
  }),
  emb: source({
    label: 'Environmental Management Bureau Region II',
    url: 'https://r2.emb.gov.ph/',
    status: 'pending',
    authority: 'regional',
    jurisdiction: 'Cagayan Valley - general agency information',
    sourceType: 'directory',
    verificationNote:
      'No Lal-lo collection schedule, local fee, or municipal environmental contact is published here.',
  }),
  dhsud: source({
    label: 'Department of Human Settlements and Urban Development',
    url: 'https://dhsud.gov.ph/',
    status: 'pending',
    authority: 'national',
    jurisdiction: 'Philippines - general agency information',
    sourceType: 'directory',
    verificationNote:
      'A general agency homepage cannot verify Lal-lo-specific land-use requirements or fees.',
  }),
};

export const serviceRecords: ServiceRecord[] = [
  {
    slug: 'health-services',
    title: 'Lal-lo Rural Health Unit information',
    category: 'Health',
    classification: 'Verified facility directory record',
    description:
      'The DOH facility directory identifies the public Lal-lo Rural Health Unit as an iDOTS facility in Centro. PhilHealth also lists the RHU in a CY 2026 accredited-provider list. Other municipal health services, schedules, and fees are not inferred.',
    responsibleOffice: 'Lal-lo Rural Health Unit',
    contact: '(+63) 926-477-3278 · rhulallo@yahoo.com',
    onlinePortal: officialSources.dohRhu.url,
    pendingFields: [
      'requirements',
      'processing time',
      'fees',
      'full service list',
    ],
    source: officialSources.dohRhu,
    relatedSources: [officialSources.philhealthRhu],
    status: 'verified',
  },
  {
    slug: 'education-support',
    title: 'Education support',
    category: 'Education',
    classification: 'Public information guide',
    description:
      'DepEd publishes Lal-lo school records through its public inventory dashboard. Local scholarship, enrollment-support, and municipal assistance details remain pending a Lal-lo-specific publication.',
    pendingFields: [
      'requirements',
      'processing time',
      'fees',
      'municipal responsible office',
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
      'Use this guide to orient a new or existing business toward the correct government office. Lal-lo municipal permit fees, requirements, and service times are not published until a direct municipal source is available.',
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
      'A plain-language entry point for social welfare assistance. Exact Lal-lo program availability and documentary requirements remain pending a municipal or directly applicable agency publication.',
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
    title: 'Provincial fishery support operating in Lal-lo',
    category: 'Agriculture and fisheries',
    classification: 'Provincial Citizens Charter service',
    description:
      'The Provincial Government of Cagayan Citizens Charter documents a fishery service at the Provincial Fishery Station in Lal-lo, Catayauan. This record is provincial in scope and is not a municipal agriculture-office fee schedule.',
    whoMayApply:
      'Fishpond operators, fisherfolk or farmer associations, LGUs, NGAs, and recognized NGOs.',
    requirements: [
      {
        name: 'Fingerling Purchase Order Form',
        notes: 'Duly accomplished, two copies.',
      },
      {
        name: 'Request letter',
        notes:
          'Addressed to the Governor through the Office of the Provincial Agriculturist.',
      },
    ],
    processingTime: '32 minutes for the documented request service',
    fees: 'No fee for the request service. Dispersal of up to 1,000 fingerlings is free; quantities above that are priced by prescribed size.',
    steps: [
      {
        number: 1,
        action:
          'Submit the request letter through the Office of the Provincial Agriculturist.',
        office: 'Provincial Government of Cagayan',
      },
      {
        number: 2,
        action:
          'Submit two copies of the completed Fingerling Purchase Order Form.',
        office: 'Provincial Fishery Station - Lal-lo',
      },
      {
        number: 3,
        action:
          'Coordinate the release or claim schedule with the Lal-lo fishery station.',
      },
    ],
    responsibleOffice: 'Provincial Fishery Station - Lal-lo, Catayauan',
    pendingFields: [
      'current program availability',
      'municipal agriculture services',
    ],
    source: officialSources.citizensCharter,
    relatedSources: [officialSources.pcafAgriculture],
    status: 'verified',
  },
  {
    slug: 'infrastructure-reports',
    title: 'Infrastructure and public works',
    category: 'Infrastructure and public works',
    classification: 'Public information guide',
    description:
      'The transparency register includes dated national, provincial, and DILG project records. Municipal project contacts, current field status, and completion claims remain separate from those records until directly verified.',
    pendingFields: ['municipal responsible office', 'current field status'],
    source: officialSources.dpwh,
    status: 'pending',
  },
  {
    slug: 'waste-services',
    title: 'Waste and environmental services',
    category: 'Environment and waste',
    classification: 'Public information guide',
    description:
      'A guide to environmental information and waste-service questions. Lal-lo collection schedules, fees, and local contacts remain pending an official municipal publication.',
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
    classification: 'Verified provincial program contact',
    description:
      'Cagayan PDRRMO publishes the We Care Lal-lo program and identifies 0927-181-9424 for text or call. This is a provincial disaster-response channel; local evacuation procedures and additional municipal hotlines are not inferred.',
    responsibleOffice:
      'Cagayan Provincial Disaster Risk Reduction and Management Office',
    contact: '0927-181-9424 · pdrrmo@cagayan.gov.ph',
    onlinePortal: officialSources.pdrrmo.url,
    pendingFields: ['Lal-lo municipal hotlines', 'local evacuation procedures'],
    source: officialSources.pdrrmo,
    relatedSources: [officialSources.pdrrmoContacts],
    status: 'verified',
  },
  {
    slug: 'permits-and-land-use',
    title: 'Permits and land use',
    category: 'Housing and land use',
    classification: 'Public information guide',
    description:
      'A source-first starting point for building, land-use, and related permit questions. Lal-lo requirements, fees, and processing times are not published until verified from the responsible local office.',
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

const pendingDepartmentSource = source({
  label: 'Official municipal office publication not located',
  url: 'https://cagayan.gov.ph/city-and-municipalities/',
  status: 'pending',
  authority: 'provincial',
  jurisdiction: 'Lal-lo, Cagayan',
  sourceType: 'directory',
  verificationNote:
    'The available provincial directory does not publish this municipal office profile, so a contact or officeholder is not inferred.',
});

export const departmentRecords: DepartmentRecord[] = [
  {
    slug: 'office-of-the-mayor',
    name: 'Office of the Mayor',
    description:
      'The provincial directory abbreviates the mayor’s name as Oliver Pascual; a newer provincial publication spells it as Florence Oliver Pascual. The portal keeps both source contexts visible.',
    head: 'Hon. Florence Oliver Pascual',
    scope: 'Municipality of Lal-lo executive office',
    source: officialSources.provincialHeritage,
    relatedSources: [officialSources.provincialDirectory],
    status: 'verified',
  },
  {
    slug: 'sangguniang-bayan',
    name: 'Sangguniang Bayan',
    description:
      'The municipal legislative body. Lal-lo-specific council members, office contacts, and published legislative records remain pending an official municipal source.',
    scope: 'Municipality of Lal-lo legislative office',
    source: source({
      label: 'Local Government Code, municipal legislative framework',
      url: officialSources.ra7160.url,
      status: 'pending',
      authority: 'national',
      jurisdiction:
        'Philippines - general framework, not a Lal-lo office directory',
      sourceType: 'legal-framework',
      verificationNote:
        'The legal framework establishes the office but cannot verify Lal-lo-specific names or contacts.',
    }),
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
      'Office profile, responsible personnel, and contact details are awaiting a direct Lal-lo municipal publication.',
    scope: 'Municipality of Lal-lo',
    source: pendingDepartmentSource,
    status: 'pending' as const,
  })),
];

export const publicDirectoryRecords: DepartmentRecord[] = [
  {
    slug: 'lal-lo-rural-health-unit',
    name: 'Lal-lo Rural Health Unit',
    description:
      'Public facility listed in the DOH National TB Program directory and PhilHealth CY 2026 provider list.',
    telephone: '(+63) 926-477-3278',
    email: 'rhulallo@yahoo.com',
    scope: 'Municipal health facility, Centro, Lal-lo',
    source: officialSources.dohRhu,
    relatedSources: [officialSources.philhealthRhu],
    status: 'verified',
  },
  {
    slug: 'municipal-agriculture-office',
    name: 'Municipal Agriculture Office',
    description:
      'DA/PCAF directory contact for the Lal-lo agriculture office. Confirm current availability before visiting.',
    head: 'William Parec',
    telephone: '0906-634-0992 / 0935-923-2672',
    email: 'lallo_agricultureoffice@yahoo.com',
    scope: 'Municipal agriculture directory contact',
    source: officialSources.pcafAgriculture,
    status: 'verified',
  },
  {
    slug: 'lallo-peso',
    name: 'Lal-lo Public Employment Service Office',
    description:
      'Historical official DOLE Region II directory entry. The contact should be reconfirmed because the source is a 2023 snapshot.',
    head: 'Ulysses Jr. Dupaya',
    telephone: '0945-421-8641',
    email: 'uldupaya09@gmail.com',
    scope: 'Lal-lo Municipal Hall, P. Dupaya Street, Centro',
    source: officialSources.dolePeso,
    status: 'verified',
  },
  {
    slug: 'cagayan-pdrrmo-lal-lo',
    name: 'Cagayan PDRRMO - We Care Lal-lo program',
    description:
      'Provincial disaster-response program with a published Lal-lo contact channel.',
    telephone: '0927-181-9424 · 0975-434-8083',
    email: 'pdrrmo@cagayan.gov.ph',
    scope: 'Provincial disaster-response program serving Lal-lo',
    source: officialSources.pdrrmo,
    relatedSources: [officialSources.pdrrmoContacts],
    status: 'verified',
  },
  {
    slug: 'lal-lo-national-high-school',
    name: 'Lal-lo National High School',
    description:
      'School record identified through the DepEd public inventory dashboard. This is a DepEd school record, not a municipal office.',
    scope: 'DepEd school record in Lal-lo, Cagayan',
    source: officialSources.deped,
    status: 'verified',
  },
];

export const statisticRecords: StatisticRecord[] = [
  {
    id: 'barangays',
    label: 'Barangays',
    value: 35,
    unit: 'barangays',
    period: '2024 PSGC profile reviewed 2026-09-21',
    description: 'The current PSA PSGC page lists 35 barangays for Lal-lo.',
    source: officialSources.psaBarangays,
    status: 'verified',
  },
  {
    id: 'population',
    label: 'Population',
    value: 48404,
    unit: 'people',
    period: '2024 POPCEN (01 July 2024)',
    description:
      'Total population reported for Lal-lo in the 2024 Census of Population.',
    source: officialSources.psaPopulation,
    status: 'verified',
  },
  {
    id: 'household-population',
    label: 'Household population',
    value: 48188,
    unit: 'people',
    period: '2024 POPCEN (01 July 2024)',
    description: 'Household population reported by the PSA municipality row.',
    source: officialSources.psaPopulation,
    status: 'verified',
  },
  {
    id: 'households',
    label: 'Households',
    value: 11992,
    unit: 'households',
    period: '2024 POPCEN (01 July 2024)',
    description: 'Number of households reported by the PSA municipality row.',
    source: officialSources.psaPopulation,
    status: 'verified',
  },
  {
    id: 'urban-population',
    label: 'Urban population',
    value: 6394,
    unit: 'people',
    period: '2024 POPCEN (01 July 2024)',
    description: 'Urban population reported by the PSA urban/rural table.',
    source: officialSources.psaUrbanity,
    status: 'verified',
  },
  {
    id: 'urban-rural-barangays',
    label: 'Urban and rural barangays',
    value: '1 urban / 34 rural',
    unit: 'barangays',
    period: 'Current PSGC classification reviewed 2026-09-21',
    description:
      'Magapit is classified as urban on the current PSA profile; the other 34 listed barangays are rural.',
    source: officialSources.psaUrbanity,
    status: 'verified',
  },
  {
    id: 'municipal-income',
    label: 'Municipal income class',
    value: '1st class',
    period: 'Current PSGC profile reviewed 2026-09-21',
    description:
      'PSA identifies Lal-lo as a first-class municipality; this is not a peso revenue figure.',
    source: officialSources.psaBarangays,
    status: 'verified',
  },
  {
    id: 'cbms',
    label: '2024 CBMS release',
    value: 'Preliminary',
    period: 'Results presented 2025-07-25',
    description:
      'PSA Cagayan presented preliminary 2024 CBMS results to Lal-lo officials. Detailed indicators are not treated as final estimates here.',
    source: officialSources.psaCbms,
    status: 'verified',
  },
  {
    id: 'budget',
    label: 'Budget tables',
    value: 'FY 2024-FY 2026',
    period: 'DBM table set reviewed 2026-09-21',
    description:
      'DBM publishes the relevant local-government tables. The current PDF text layer exposes higher-level rows rather than a readable Lal-lo row, so amounts remain in table-layout review.',
    source: officialSources.dbm,
    status: 'pending',
  },
  {
    id: 'development',
    label: 'Competitiveness and development',
    period: 'Awaiting a Lal-lo-specific official indicator',
    description:
      'No value is published until an official dataset identifies Lal-lo and its reporting period.',
    source: officialSources.dilg,
    status: 'pending',
  },
];

export const financialSnapshots: FinancialSnapshot[] = [
  {
    id: 'blgf-sre-lallo-fy2023',
    fiscalYear: 2023,
    metrics: {
      currentOperatingIncome: 357166857.06,
      localSources: 38905538.8,
      externalSources: 318261318.26,
      currentOperatingExpenditures: 258259783.46,
      netOperatingIncome: 98907073.6,
      cashBalanceEnd: 158115405.87,
      generalPublicServices: 193115636.04,
      socialServices: 38596798.42,
      economicServices: 25263857.67,
      debtServiceInterest: 1283491.33,
    },
    extractionDate: '2024-05-28',
    source: officialSources.blgfSreFy2023,
    status: 'verified',
    reviewNote:
      'The Lal-Lo municipality row was reviewed against the workbook column headings and displayed PHP-million format.',
  },
  {
    id: 'blgf-sre-lallo-fy2024',
    fiscalYear: 2024,
    metrics: {
      currentOperatingIncome: 391612500.24,
      localSources: 55915653.37,
      externalSources: 335696846.87,
      currentOperatingExpenditures: 286199224.37,
      netOperatingIncome: 105413275.87,
      cashBalanceEnd: 151812919.75,
      generalPublicServices: 185180660.25,
      socialServices: 50103473.49,
      economicServices: 35058450.64,
      debtServiceInterest: 15856639.99,
    },
    extractionDate: '2025-11-27',
    source: officialSources.blgfSreFy2024,
    status: 'verified',
    reviewNote:
      'The Lal-Lo municipality row was reviewed against the workbook column headings and displayed PHP-million format.',
  },
  {
    id: 'blgf-sre-lallo-fy2025',
    fiscalYear: 2025,
    metrics: {
      currentOperatingIncome: 458151828.33,
      localSources: 59668346.33,
      externalSources: 398483482,
      currentOperatingExpenditures: 341155013.58,
      netOperatingIncome: 116996814.75,
      cashBalanceEnd: 176521490.35,
      generalPublicServices: 221634390.4,
      socialServices: 51643451.4,
      economicServices: 62589324.89,
      debtServiceInterest: 5287846.89,
    },
    extractionDate: '2026-03-03',
    source: officialSources.blgfSreFy2025,
    status: 'verified',
    reviewNote:
      'The Lal-Lo municipality row was reviewed against the workbook column headings and displayed PHP-million format.',
  },
];

export const fdpDocumentRecords: FdpDocumentRecord[] = [
  'Annual Budget Report',
  'Annual Procurement Plan',
  'Statement of Receipts and Expenditures',
  '20% of the National Tax Allotment Utilization',
  'Local Disaster Risk Reduction and Management Fund Utilization',
  'Report of Special Education Fund Utilization',
  'Quarterly Statement of Cash Flow',
  'Bid Results on Civil Works, Goods and Services, and Consulting Services',
].map((documentType, index) => ({
  id: `fdp-lallo-${index + 1}`,
  documentType,
  fiscalPeriod: 'Portal periods 2022-2026',
  sourcePortal: officialSources.fullDisclosurePortal.url,
  source: officialSources.fullDisclosurePortal,
  status: 'pending',
  reviewNote:
    'Lal-lo-specific document URL was not approved in this review. Use the official portal filters to check the current posting before treating a document as published evidence.',
}));

export const legislationRecords: LegislationRecord[] = [];

export const transparencySections: TransparencySection[] = [
  {
    slug: 'financial',
    title: 'Financial records',
    description:
      'Budget, expenditure, and financial-management records for Lal-lo.',
    summary:
      'BLGF annual Statement of Receipts and Expenditures snapshots for FY2023-FY2025 are verified and shown in Philippine pesos. Approved-budget amounts remain separate pending DBM row review, and the COA Water District audit is excluded from municipal-government finance.',
    sources: [
      officialSources.blgfSreFy2023,
      officialSources.blgfSreFy2024,
      officialSources.blgfSreFy2025,
      officialSources.fullDisclosurePortal,
      officialSources.dbmFy2024,
      officialSources.dbmFy2025,
      officialSources.dbmFy2026,
    ],
    records: [
      {
        id: 'dbm-lallo-fy2024-2026',
        title: 'DBM approved-budget municipality table set',
        summary:
          'Official FY2024-FY2026 DBM tables remain a separate approved-budget source. Amounts are not reproduced until Lal-lo’s row is checked and approved.',
        period: 'FY 2024-FY 2026',
        authority: 'national',
        jurisdiction: 'Lal-lo, Cagayan',
        projectStatus: 'Row-level import review',
        source: officialSources.dbm,
        status: 'pending',
      },
    ],
    status: 'verified',
  },
  {
    slug: 'procurement',
    title: 'Procurement',
    description:
      'Public procurement notices, awards, and related source documents.',
    summary:
      'One Lal-lo-specific PhilGEPS bid notice is published as a dated notice. The record does not imply award, delivery, or completion.',
    sources: [officialSources.philgeps],
    records: [
      {
        id: 'philgeps-13112765',
        title: 'Supply and Delivery of 200 Heads Gilt',
        summary:
          'Municipality of Lal-lo procurement notice; solicitation Goods-2026-07-009; public bidding; BAC contact Engr. Ronald E. Matas.',
        period: 'Published 2026-07-08; closing 2026-07-27',
        authority: 'national',
        jurisdiction: 'Municipality of Lal-lo, Cagayan Valley',
        amount: 'ABC: ₱9,000,000',
        projectStatus: 'Closed notice; award or completion not established',
        source: officialSources.philgeps,
        status: 'verified',
      },
    ],
    status: 'verified',
  },
  {
    slug: 'infrastructure',
    title: 'Projects and infrastructure',
    description:
      'Infrastructure project status, funding, implementing office, and source documents.',
    summary:
      'The records below are published with the owning agency and status language preserved. They are not presented as municipal-government projects unless the source says so.',
    sources: [
      officialSources.dpwh,
      officialSources.cagayanFundReport,
      officialSources.dilg,
    ],
    records: [
      {
        id: 'dpwh-ammunition-storage-lallo',
        title:
          'Construction of Ammunition Storage (Igloo), Lal-lo, Cagayan, Phase IV',
        summary: 'Listed in the DPWH Region II FY2024 infrastructure program.',
        period: 'FY 2024',
        authority: 'national',
        jurisdiction: 'Lal-lo, Cagayan',
        amount: '₱4,800,000',
        projectStatus: 'Program listing; completion not established',
        source: officialSources.dpwh,
        status: 'verified',
      },
      {
        id: 'dpwh-barracks-lallo',
        title:
          'Construction of Enlisted Personnel Barracks Building 1, 17th IB, Bangag',
        summary: 'Listed in the DPWH Region II FY2024 infrastructure program.',
        period: 'FY 2024',
        authority: 'national',
        jurisdiction: 'Bangag, Lal-lo, Cagayan',
        amount: '₱14,500,000',
        projectStatus: 'Program listing; completion not established',
        source: officialSources.dpwh,
        status: 'verified',
      },
      {
        id: 'dpwh-admin-building-lallo',
        title:
          'Construction of Administration Building, 17th IB, NOLCOM, Bangag',
        summary: 'Listed in the DPWH Region II FY2024 infrastructure program.',
        period: 'FY 2024',
        authority: 'national',
        jurisdiction: 'Bangag, Lal-lo, Cagayan',
        amount: '₱15,580,000',
        projectStatus: 'Program listing; completion not established',
        source: officialSources.dpwh,
        status: 'verified',
      },
      {
        id: 'cagayan-tobacco-farmers-building',
        title: 'Multi-Purpose Building for Tobacco Farmers and Workers',
        summary:
          'Provincial fund report entry for the Sub-Capital, Bangag, Lal-lo.',
        period: '2024 provincial fund report',
        authority: 'provincial',
        jurisdiction: 'Sub-Capital, Bangag, Lal-lo, Cagayan',
        amount: '₱18,000,000',
        projectStatus:
          'For preparation of Program of Works and Detailed Engineering Design',
        source: officialSources.cagayanFundReport,
        status: 'verified',
      },
      {
        id: 'dilg-balay-silangan-magapit',
        title: 'Balay Silangan Reformation Center, Barangay Magapit',
        summary: 'DILG Region II report on an SGLGIF-funded Lal-lo project.',
        period: 'FY 2023 SGLGIF; inaugurated 2025-06-19',
        authority: 'regional',
        jurisdiction: 'Barangay Magapit, Lal-lo, Cagayan',
        projectStatus: 'Reported inaugurated 2025-06-19',
        source: officialSources.dilg,
        status: 'verified',
      },
    ],
    status: 'verified',
  },
];
