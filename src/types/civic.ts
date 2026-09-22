export type VerificationStatus = 'verified' | 'pending' | 'unverified';

export type SourceAuthority =
  'municipal' | 'provincial' | 'regional' | 'national';

export type SourceType =
  | 'open-data'
  | 'budget'
  | 'financial-report'
  | 'full-disclosure'
  | 'audit'
  | 'procurement'
  | 'directory'
  | 'facility-registry'
  | 'citizens-charter'
  | 'project-report'
  | 'history'
  | 'program-report'
  | 'legal-framework';

export type CivicContactChannel = 'phone' | 'email' | 'website';

export interface CivicContact {
  id: string;
  name: string;
  category: string;
  channel: CivicContactChannel;
  value: string;
  description?: string;
  scope: string;
  availability?: string;
  source: SourceRecord;
  status: VerificationStatus;
}

export type UpdateType = 'announcement' | 'project' | 'data-release' | 'guide';

export interface UpdateRecord {
  id: string;
  title: string;
  type: UpdateType;
  publishedDate?: string;
  summary: string;
  href: string;
  source: SourceRecord;
  status: VerificationStatus;
}

export interface OnlineServiceLink {
  id: string;
  label: string;
  description: string;
  serviceCategory: string;
  href: string;
  authority: string;
  source: SourceRecord;
  status: VerificationStatus;
}

export interface BarangayRecord {
  name: string;
  code: string;
  population: number;
  householdPopulation: number;
  households: number;
  classification: 'Urban' | 'Rural';
  source: SourceRecord;
}

export interface HeritageRecord {
  id: string;
  name: string;
  location: string;
  description: string;
  source: SourceRecord;
  status: VerificationStatus;
}

export interface SourceRecord {
  label: string;
  url: string;
  lastVerified: string;
  status: VerificationStatus;
  authority: SourceAuthority;
  jurisdiction: string;
  sourceType: SourceType;
  publicationDate?: string;
  extractionDate?: string;
  dataPeriod?: string;
  verificationNote?: string;
}

export type ResourceGroupId =
  | 'contacts'
  | 'services'
  | 'government'
  | 'records'
  | 'data'
  | 'heritage'
  | 'updates'
  | 'help';

export type ResourceLinkType = 'internal' | 'external' | 'phone' | 'email';

export interface ResourceCollectionLink {
  id: string;
  label: string;
  description: string;
  href: string;
  linkType: 'internal' | 'external';
}

export interface VerifiedResourceEntry {
  id: string;
  group: ResourceGroupId;
  title: string;
  description: string;
  href: string;
  linkType: ResourceLinkType;
  actionLabel: string;
  portalHref?: string;
  portalLabel?: string;
  source: SourceRecord;
  status: VerificationStatus;
}

export interface VerifiedResourceGroup {
  id: ResourceGroupId;
  title: string;
  description: string;
  collectionLinks: ResourceCollectionLink[];
  resources: VerifiedResourceEntry[];
  pendingMessage?: string;
}

export interface Requirement {
  name: string;
  notes?: string;
  whereToSecure?: string;
}

export interface ServiceStep {
  number: number | string;
  action: string;
  office?: string;
  role?: 'client' | 'agency';
}

export type ServiceRecordKind = 'overview' | 'charter-procedure';

export interface ServiceRecord {
  slug: string;
  title: string;
  category: string;
  classification: string;
  description: string;
  whoMayApply?: string;
  requirements?: Requirement[];
  processingTime?: string;
  fees?: string;
  steps?: ServiceStep[];
  responsibleOffice?: string;
  contact?: string;
  onlinePortal?: string;
  transactionTypes?: string[];
  charterPages?: string;
  recordKind?: ServiceRecordKind;
  includeInResourceHub?: boolean;
  charterExcerpt?: string;
  pendingFields?: string[];
  source: SourceRecord;
  relatedSources?: SourceRecord[];
  status: VerificationStatus;
}

export interface StatisticRecord {
  id: string;
  label: string;
  value?: string | number;
  unit?: string;
  period: string;
  description: string;
  source: SourceRecord;
  status: VerificationStatus;
}

export type FinancialMetricKey =
  | 'currentOperatingIncome'
  | 'localSources'
  | 'externalSources'
  | 'currentOperatingExpenditures'
  | 'netOperatingIncome'
  | 'cashBalanceEnd'
  | 'generalPublicServices'
  | 'socialServices'
  | 'economicServices'
  | 'debtServiceInterest';

export interface FinancialSnapshot {
  id: string;
  fiscalYear: number;
  metrics: Record<FinancialMetricKey, number>;
  extractionDate: string;
  source: SourceRecord;
  status: VerificationStatus;
  reviewNote?: string;
}

export interface FdpDocumentRecord {
  id: string;
  documentType: string;
  fiscalPeriod: string;
  documentUrl?: string;
  sourcePortal: string;
  source: SourceRecord;
  status: VerificationStatus;
  reviewNote: string;
}

export type LegislationType = 'ordinance' | 'resolution' | 'executive-order';

export interface LegislationRecord {
  id: string;
  title: string;
  type: LegislationType;
  number?: string;
  year?: number;
  author?: string;
  legislativeTerm?: string;
  source: SourceRecord;
  status: VerificationStatus;
}

export interface DepartmentRecord {
  slug: string;
  name: string;
  description: string;
  head?: string;
  telephone?: string;
  telephoneNumbers?: string[];
  email?: string;
  website?: string;
  mapUrl?: string;
  scope?: string;
  source: SourceRecord;
  relatedSources?: SourceRecord[];
  status: VerificationStatus;
}

export interface WeatherSnapshot {
  fetchedAt: string;
  timezone: string;
  current: {
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
  };
  daily: Array<{
    date: string;
    minimum: number;
    maximum: number;
    weatherCode: number;
  }>;
}

export interface TransparencySection {
  slug: 'financial' | 'procurement' | 'infrastructure';
  title: string;
  description: string;
  summary: string;
  sources: SourceRecord[];
  records?: TransparencyRecord[];
  status: VerificationStatus;
}

export interface TransparencyRecord {
  id: string;
  title: string;
  summary: string;
  period: string;
  authority: SourceAuthority;
  jurisdiction: string;
  amount?: string;
  projectStatus?: string;
  source: SourceRecord;
  status: VerificationStatus;
}
