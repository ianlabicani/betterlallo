export type LanguageType =
  | 'en' // English
  | 'fil'; // Filipino (standardized Tagalog)

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export type {
  DepartmentRecord,
  LegislationRecord,
  Requirement,
  ServiceRecord,
  ServiceStep,
  SourceRecord,
  StatisticRecord,
  TransparencySection,
  VerificationStatus,
  WeatherSnapshot,
} from './civic';
