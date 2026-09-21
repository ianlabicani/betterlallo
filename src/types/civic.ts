export type VerificationStatus = 'verified' | 'pending' | 'unverified';

export type SourceAuthority =
  'municipal' | 'provincial' | 'regional' | 'national';

export type SourceType =
  | 'open-data'
  | 'budget'
  | 'audit'
  | 'procurement'
  | 'directory'
  | 'facility-registry'
  | 'citizens-charter'
  | 'project-report'
  | 'history'
  | 'program-report'
  | 'legal-framework';

export interface SourceRecord {
  label: string;
  url: string;
  lastVerified: string;
  status: VerificationStatus;
  authority: SourceAuthority;
  jurisdiction: string;
  sourceType: SourceType;
  publicationDate?: string;
  dataPeriod?: string;
  verificationNote?: string;
}

export interface Requirement {
  name: string;
  notes?: string;
}

export interface ServiceStep {
  number: number;
  action: string;
  office?: string;
}

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
