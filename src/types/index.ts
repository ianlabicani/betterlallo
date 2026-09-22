export type LanguageType =
  | 'en' // English
  | 'fil' // Filipino (standardized Tagalog)
  | 'ilo'; // Ilocano

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export type {
  BarangayRecord,
  CivicContact,
  DepartmentRecord,
  FdpDocumentRecord,
  FinancialMetricKey,
  FinancialSnapshot,
  HeritageRecord,
  LegislationRecord,
  OnlineServiceLink,
  Requirement,
  ServiceRecord,
  ServiceStep,
  SourceRecord,
  SourceAuthority,
  SourceType,
  ResourceCollectionLink,
  ResourceGroupId,
  ResourceLinkType,
  StatisticRecord,
  TransparencyRecord,
  TransparencySection,
  UpdateRecord,
  UpdateType,
  VerifiedResourceEntry,
  VerifiedResourceGroup,
  VerificationStatus,
  WeatherSnapshot,
} from './civic';
