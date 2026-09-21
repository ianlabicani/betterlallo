import type { NavigationItem } from '../types';
import { governmentCategories, serviceCategories } from './yamlLoader';

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: serviceCategories.categories.map(category => ({
      label: category.category,
      href: `/services/${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government/overview',
    children: governmentCategories.categories.map(category => ({
      label: category.category,
      href: `/government/${category.slug}`,
    })),
  },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
      links: [
        { label: 'About BetterLal-lo', href: '/about' },
        {
          label: 'How information is verified',
          href: '/government/overview/about-lallo',
        },
        { label: 'Accessibility', href: '/about#accessibility' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        { label: 'Health Services', href: '/services/health-services' },
        { label: 'Business and Livelihood', href: '/services/business' },
        {
          label: 'Disaster Preparedness',
          href: '/services/disaster-preparedness',
        },
        {
          label: 'Agriculture and Fisheries',
          href: '/services/agriculture-fisheries',
        },
      ],
    },
    {
      title: 'Government',
      links: [
        { label: 'Government Departments', href: '/government/departments' },
        { label: 'Barangays', href: '/government/barangays' },
        {
          label: 'Transparency Documents',
          href: '/government/transparency',
        },
        {
          label: 'PSA Lal-lo Profile',
          href: 'https://psa.gov.ph/classification/psgc/barangays/0201516000',
        },
      ],
    },
  ],
  socialLinks: [] as Array<{ label: string; href: string }>,
};
