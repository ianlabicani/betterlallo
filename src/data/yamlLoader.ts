import * as yaml from 'js-yaml';
import servicesYamlContent from './services.yaml?raw';
import governmentYamlContent from './government.yaml?raw';

export interface Subcategory {
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
  subcategories?: Subcategory[];
}

export interface CategoryData {
  categories: Category[];
  description?: string;
}

export interface CategoryIndexData {
  title?: string;
  description?: string;
  layout?: 'grid' | 'list';
  pages: Subcategory[];
}

import healthServicesIndex from '../../content/services/health-services/index.yaml?raw';
import educationIndex from '../../content/services/education/index.yaml?raw';
import businessIndex from '../../content/services/business/index.yaml?raw';
import socialWelfareIndex from '../../content/services/social-welfare/index.yaml?raw';
import agricultureFisheriesIndex from '../../content/services/agriculture-fisheries/index.yaml?raw';
import infrastructurePublicWorksIndex from '../../content/services/infrastructure-public-works/index.yaml?raw';
import garbageWasteDisposalIndex from '../../content/services/garbage-waste-disposal/index.yaml?raw';
import environmentIndex from '../../content/services/environment/index.yaml?raw';
import disasterPreparednessIndex from '../../content/services/disaster-preparedness/index.yaml?raw';
import housingLandUseIndex from '../../content/services/housing-land-use/index.yaml?raw';
import certificatesIndex from '../../content/services/certificates/index.yaml?raw';
import taxPaymentsIndex from '../../content/services/tax-payments/index.yaml?raw';
import barangayServicesIndex from '../../content/services/barangay-services/index.yaml?raw';
import governmentDepartmentsIndex from '../../content/government/departments/index.yaml?raw';
import governmentOverviewIndex from '../../content/government/overview/index.yaml?raw';
import governmentBarangaysIndex from '../../content/government/barangays/index.yaml?raw';
import governmentTransparencyIndex from '../../content/government/transparency/index.yaml?raw';
import citizensCharter2026Index from '../../content/services/citizens-charter-2026/index.yaml?raw';

const categoryIndexMap: Record<string, string> = {
  'health-services': healthServicesIndex,
  education: educationIndex,
  business: businessIndex,
  'social-welfare': socialWelfareIndex,
  'agriculture-fisheries': agricultureFisheriesIndex,
  'infrastructure-public-works': infrastructurePublicWorksIndex,
  'garbage-waste-disposal': garbageWasteDisposalIndex,
  environment: environmentIndex,
  'disaster-preparedness': disasterPreparednessIndex,
  'housing-land-use': housingLandUseIndex,
  certificates: certificatesIndex,
  'tax-payments': taxPaymentsIndex,
  'barangay-services': barangayServicesIndex,
  'citizens-charter-2026': citizensCharter2026Index,
  departments: governmentDepartmentsIndex,
  overview: governmentOverviewIndex,
  barangays: governmentBarangaysIndex,
  transparency: governmentTransparencyIndex,
};

export const serviceCategories = yaml.load(servicesYamlContent) as CategoryData;

export const governmentCategories = yaml.load(
  governmentYamlContent
) as CategoryData;

export interface CategoryIndex {
  title?: string;
  description?: string;
  layout: 'grid' | 'list';
  pages: Subcategory[];
}

export async function loadCategoryIndex(
  categorySlug: string
): Promise<CategoryIndex> {
  const yamlContent = categoryIndexMap[categorySlug];
  if (!yamlContent) return { layout: 'list', pages: [] };

  try {
    const indexData = yaml.load(yamlContent) as CategoryIndexData;
    return {
      title: indexData.title,
      description: indexData.description,
      layout: indexData.layout ?? 'list',
      pages: indexData.pages || [],
    };
  } catch (parseError) {
    console.warn(`Failed to parse category ${categorySlug}:`, parseError);
    return { layout: 'list', pages: [] };
  }
}

const categoryCache = new Map<string, CategoryIndex>();

export async function getCategorySubcategories(
  categorySlug: string
): Promise<CategoryIndex> {
  if (categoryCache.has(categorySlug)) return categoryCache.get(categorySlug)!;
  const result = await loadCategoryIndex(categorySlug);
  categoryCache.set(categorySlug, result);
  return result;
}

export function isNestedCategory(slug: string): boolean {
  return slug in categoryIndexMap;
}
