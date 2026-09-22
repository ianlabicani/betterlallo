import { serviceRecords } from './civicRecords';
import { localContentIndex } from './localContentIndex';

export type ContentType = 'service' | 'government';

export interface ContentSearchHit {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  category: string;
  categorySlug: string;
  slug: string;
  url: string;
  searchText?: string;
}

const markdownHits: ContentSearchHit[] = localContentIndex;

const structuredServiceHits: ContentSearchHit[] = serviceRecords.map(
  record => ({
    id: `service-record-${record.slug}`,
    title: record.title,
    description: record.description,
    type: 'service',
    category: record.category,
    categorySlug: record.slug,
    slug: record.slug,
    url: `/services/record/${record.slug}`,
    searchText: [
      record.title,
      record.description,
      record.category,
      record.classification,
      record.responsibleOffice,
      record.transactionTypes?.join(' '),
      record.charterPages,
      record.requirements?.map(requirement => requirement.name).join(' '),
      record.fees,
      record.processingTime,
    ]
      .filter(Boolean)
      .join(' '),
  })
);

export const contentIndex: ContentSearchHit[] = [
  ...structuredServiceHits,
  ...markdownHits,
];

export function searchLocalContent(
  query: string,
  limit = 20
): ContentSearchHit[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  if (terms.length === 0) return [];

  return contentIndex
    .map(hit => {
      const title = hit.title.toLowerCase();
      const searchable = [
        hit.title,
        hit.description,
        hit.category,
        hit.categorySlug,
        hit.searchText,
      ]
        .join(' ')
        .toLowerCase();
      const matches = terms.every(term => searchable.includes(term));
      if (!matches) return { hit, score: -1 };

      const titleScore = terms.reduce(
        (score, term) => score + (title.includes(term) ? 3 : 0),
        0
      );
      return { hit, score: titleScore + (hit.type === 'service' ? 1 : 0) };
    })
    .filter(result => result.score >= 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(result => result.hit);
}
