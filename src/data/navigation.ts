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
    children: [
      { label: 'Elected officials', href: '/government/officials' },
      { label: 'Municipal office directory', href: '/government/directory' },
      ...governmentCategories.categories.map(category => ({
        label: category.category,
        href: `/government/${category.slug}`,
      })),
    ],
  },
  {
    label: 'Explore',
    href: '/statistics',
    children: [
      { label: 'Verified resources', href: '/resources' },
      { label: 'Updates', href: '/updates' },
      { label: 'Statistics', href: '/statistics' },
      { label: 'Heritage and tourism', href: '/heritage' },
      { label: 'OpenLGU', href: '/openlgu' },
      { label: 'Transparency', href: '/transparency' },
      { label: 'Suggest a correction', href: '/contribute' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'Search',
    href: '/search',
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
        { label: 'FAQ', href: '/faq' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms of use', href: '/terms-of-use' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        { label: 'Structured service records', href: '/services' },
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
        {
          label: 'Certificates and vital records',
          href: '/services/certificates',
        },
        { label: 'Tax payments', href: '/services/tax-payments' },
        { label: 'Barangay services', href: '/services/barangay-services' },
      ],
    },
    {
      title: 'Government',
      links: [
        { label: 'Municipal office directory', href: '/government/directory' },
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
        { label: 'Heritage and tourism', href: '/heritage' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'Statistics', href: '/statistics' },
        { label: 'OpenLGU legislation', href: '/openlgu' },
        { label: 'Transparency', href: '/transparency' },
        { label: 'Search', href: '/search' },
        { label: 'Verified resources', href: '/resources' },
        { label: 'Updates', href: '/updates' },
        { label: 'Contact and hotlines', href: '/contact' },
        { label: 'Suggest a correction', href: '/contribute' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
  ],
  socialLinks: [] as Array<{ label: string; href: string }>,
};
