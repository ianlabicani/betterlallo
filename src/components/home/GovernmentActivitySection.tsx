import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router';

import { governmentCategories } from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

interface GovernmentActivitySectionProps {
  title?: string;
  description?: string;
}

export default function GovernmentActivitySection({
  title,
  description,
}: GovernmentActivitySectionProps = {}) {
  const { t } = useTranslation();

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? (
      <IconComponent className="h-6 w-6" aria-hidden="true" />
    ) : null;
  };

  const displayedCategories = governmentCategories.categories as Category[];

  return (
    <Section
      id="government"
      className="border-t border-gray-200 bg-gray-50 py-12 sm:py-14"
    >
      <div className="mb-8 max-w-3xl border-l-4 border-accent-500 pl-4">
        <Heading level={2} className="leading-tight">
          {title || t('governmentActivity.title')}
        </Heading>
        <p className="max-w-2xl leading-relaxed text-gray-600">
          {description || t('governmentActivity.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedCategories.map(category => (
          <Card
            key={category.slug}
            hoverable
            className="border-t-4 border-primary-500"
          >
            <Link
              to={`/government/${category.slug}`}
              className="block h-full text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex gap-2">
                  <div className="mb-4 self-start rounded-md bg-primary-100 p-3 text-primary-600">
                    {getIcon(category.icon)}
                  </div>

                  <h3 className="self-center text-lg font-semibold text-gray-900">
                    {category.category}
                  </h3>
                </div>
                <Text className="text-gray-800">{category.description}</Text>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
