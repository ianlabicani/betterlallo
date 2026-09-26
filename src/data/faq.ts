export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  aliases?: string[];
  link?: {
    label: string;
    href: string;
  };
}

export const faqItems: FaqItem[] = [
  {
    id: 'official-portal',
    question: 'Is BetterLal-lo the official municipal government website?',
    answer:
      'No. BetterLal-lo is an independent, community-run information portal. It links to official sources but does not speak for the Municipal Government of Lal-lo or accept applications and payments.',
  },
  {
    id: 'applications-payments',
    question: 'Can I use the portal to apply, pay, or file a report?',
    answer:
      'Not currently. The portal provides guides and source links. Confirm the current transaction channel with the responsible office, request an official receipt for payments, and do not send personal documents to an unofficial intermediary.',
  },
  {
    id: 'review-policy',
    question: 'How are contacts, updates, and statistics reviewed?',
    answer:
      'Published records include an attributable source, jurisdiction, period where available, and last-reviewed date. The portal keeps a record pending when the source does not establish a local detail.',
    aliases: [
      'How is information verified?',
      'How does BetterLal-lo verify information?',
      'verified information and source review',
    ],
  },
  {
    id: 'pending-fields',
    question: 'Why does a page say that a field is pending?',
    answer:
      'A pending label means the evidence needed for that exact Lal-lo detail was not found or approved for publication. It is intentional: fees, requirements, schedules, phone numbers, and procedures are not guessed.',
  },
  {
    id: 'emergency-references',
    question: 'Where can I find emergency contact references?',
    answer:
      'Open the emergency and contact hub. Follow current responder instructions and confirm channel availability before relying on a published number.',
    link: {
      label: 'Open emergency and contact hub',
      href: '/contact#emergency',
    },
  },
  {
    id: 'suggest-correction',
    question: 'How can I suggest a correction?',
    answer:
      'Use the contribution guide to send the exact source, field, period, and correction. Maintainers review changes before they are added to the static site.',
    link: {
      label: 'Open the contribution guide',
      href: '/contribute',
    },
  },
];
