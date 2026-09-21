import { serviceRecords } from './civicRecords';

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
}

const markdownModules = import.meta.glob('../../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function cleanDescription(markdown: string): string {
  const withoutHeading = markdown.replace(/^#\s+.+$/m, '').trim();
  const paragraph = withoutHeading.split(/\n\s*\n/)[0] ?? '';
  return paragraph.replace(/^>\s*/, '').replace(/[*_`]/g, '').trim();
}

function titleFromMarkdown(markdown: string, fallback: string): string {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

const markdownHits: ContentSearchHit[] = Object.entries(markdownModules)
  .map(([path, markdown]) => {
    const match = path.match(
      /content\/(services|government)\/([^/]+)\/([^/]+)\.md$/
    );
    if (!match) return null;

    const [, section, categorySlug, slug] = match;
    const contentType: ContentType =
      section === 'services' ? 'service' : 'government';
    const category = categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: `${contentType}-${categorySlug}-${slug}`,
      title: titleFromMarkdown(markdown, slug),
      description: cleanDescription(markdown),
      type: contentType,
      category,
      categorySlug,
      slug,
      url: `/${contentType === 'service' ? 'services' : 'government'}/${categorySlug}/${slug}`,
    };
  })
  .filter((hit): hit is ContentSearchHit => hit !== null);

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
