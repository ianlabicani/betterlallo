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
    label: 'Statistics',
    href: '/statistics',
  },
  {
    label: 'OpenLGU',
    href: '/openlgu',
  },
  {
    label: 'Transparency',
    href: '/transparency',
    children: [
      { label: 'Financial records', href: '/transparency/financial' },
      { label: 'Procurement', href: '/transparency/procurement' },
      {
        label: 'Projects and infrastructure',
        href: '/transparency/infrastructure',
      },
    ],
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
        { label: 'Accessibility', href: '/about#accessibility' },
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
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'Statistics', href: '/statistics' },
        { label: 'OpenLGU legislation', href: '/openlgu' },
        { label: 'Transparency', href: '/transparency' },
        { label: 'Search', href: '/search' },
      ],
    },
  ],
  socialLinks: [] as Array<{ label: string; href: string }>,
};
