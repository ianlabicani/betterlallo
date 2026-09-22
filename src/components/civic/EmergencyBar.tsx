import {
  ArrowRight,
  ChevronDown,
  Mail,
  PhoneCall,
  ShieldAlert,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { civicContacts } from '../../data/civicRecords';
import type { CivicContact } from '../../types/civic';

const primaryHotlineConfig = [
  { id: 'pdrrmo-lal-lo-phone', label: 'PDRRMO Lal-lo' },
  { id: 'pdrrmo-contact-phone', label: 'Cagayan PDRRMO' },
];

const additionalContactIds = [
  'pdrrmo-contact-email',
  'rhu-lal-lo-phone',
  'rhu-lal-lo-email',
  'agriculture-office-phone',
  'agriculture-office-email',
  'peso-phone',
  'peso-email',
];

function findVerifiedContact(id: string) {
  const contact = civicContacts.find(candidate => candidate.id === id);
  return contact?.status === 'verified' ? contact : undefined;
}

function phoneValues(value: string) {
  return value
    .split('/')
    .map(number => number.trim())
    .filter(Boolean);
}

function phoneHref(value: string) {
  return `tel:${value.replace(/[^+\d]/g, '')}`;
}

function displayContactName(name: string) {
  return name.replace(/\s+email$/i, '');
}

function groupContacts(contacts: CivicContact[]) {
  const groups = new Map<string, CivicContact[]>();

  contacts.forEach(contact => {
    const name = displayContactName(contact.name);
    const group = groups.get(name) ?? [];
    group.push(contact);
    groups.set(name, group);
  });

  return Array.from(groups, ([name, groupedContacts]) => ({
    name,
    contacts: groupedContacts,
  }));
}

function ContactValueLinks({
  contact,
  compact = false,
}: {
  contact: CivicContact;
  compact?: boolean;
}) {
  const values =
    contact.channel === 'phone' ? phoneValues(contact.value) : [contact.value];
  const Icon = contact.channel === 'phone' ? PhoneCall : Mail;

  return (
    <div className={`flex flex-col gap-1 ${compact ? 'text-xs' : 'text-sm'}`}>
      {values.map(value => {
        const href =
          contact.channel === 'phone' ? phoneHref(value) : `mailto:${value}`;
        const action = contact.channel === 'phone' ? 'Call' : 'Email';

        return (
          <a
            key={`${contact.id}-${value}`}
            href={href}
            aria-label={`${action} ${contact.name} at ${value}`}
            className="inline-flex items-center gap-1 font-semibold text-red-100 underline decoration-red-300 underline-offset-2 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-950"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {value}
          </a>
        );
      })}
    </div>
  );
}

function PrimaryHotline({
  label,
  contact,
}: {
  label: string;
  contact: CivicContact;
}) {
  const number = phoneValues(contact.value)[0];

  if (!number) {
    return null;
  }

  return (
    <a
      href={phoneHref(number)}
      aria-label={`Call ${label} at ${number}`}
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-red-700 bg-red-900 px-3 py-1.5 font-semibold text-white shadow-sm transition-colors hover:border-red-500 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-950"
    >
      <PhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
      <span className="font-bold tabular-nums">{number}</span>
    </a>
  );
}

function AdditionalContact({
  name,
  contacts,
}: {
  name: string;
  contacts: CivicContact[];
}) {
  return (
    <div className="border-b border-red-800 pb-3 last:border-b-0 last:pb-0">
      <p className="text-sm font-semibold text-white">{name}</p>
      <div className="mt-1 space-y-1">
        {contacts.map(contact => (
          <ContactValueLinks key={contact.id} contact={contact} compact />
        ))}
      </div>
    </div>
  );
}

export default function EmergencyBar() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        detailsRef.current &&
        !detailsRef.current.contains(target)
      ) {
        detailsRef.current.open = false;
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const primaryHotlines = primaryHotlineConfig.flatMap(({ id, label }) => {
    const contact = findVerifiedContact(id);
    return contact ? [{ contact, label }] : [];
  });
  const additionalContacts = additionalContactIds
    .map(findVerifiedContact)
    .filter((contact): contact is CivicContact => Boolean(contact));
  const additionalContactGroups = groupContacts(additionalContacts);

  return (
    <div
      className="bg-red-950 text-white"
      role="region"
      aria-label="Emergency hotlines"
    >
      <div className="container mx-auto flex min-w-0 items-center gap-2 px-4 py-2">
        <div
          className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:thin] [touch-action:pan-x] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
          tabIndex={0}
          role="group"
          aria-label="Emergency hotline links. Scroll horizontally for more."
        >
          <div className="flex min-w-max items-center gap-2 pr-2 text-xs sm:text-sm">
            <div className="flex shrink-0 items-center gap-2 border-r border-red-800 pr-3">
              <ShieldAlert
                className="h-4 w-4 shrink-0 text-red-200"
                aria-hidden="true"
              />
              <span className="font-bold uppercase tracking-wide">
                Emergency hotlines
              </span>
            </div>

            {primaryHotlines.length > 0 ? (
              primaryHotlines.map(({ contact, label }) => (
                <PrimaryHotline
                  key={contact.id}
                  contact={contact}
                  label={label}
                />
              ))
            ) : (
              <span className="shrink-0 text-red-100">
                No verified emergency hotline is currently published.
              </span>
            )}
          </div>
        </div>

        <details ref={detailsRef} className="group relative shrink-0">
          <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full border border-red-700 bg-red-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-red-500 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-950 [&::-webkit-details-marker]:hidden sm:text-sm">
            More contacts
            <ChevronDown
              className="h-4 w-4 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 max-h-[calc(100dvh-2rem)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto overscroll-contain rounded-xl border border-red-800 bg-red-950 p-4 text-white shadow-xl [scrollbar-width:thin]">
            <div className="mb-3">
              <h2 className="text-sm font-bold">More contacts</h2>
              <p className="mt-1 text-xs text-red-200">
                Call or email verified offices.
              </p>
            </div>

            {additionalContactGroups.length > 0 ? (
              <div className="space-y-3">
                {additionalContactGroups.map(group => (
                  <AdditionalContact
                    key={group.name}
                    name={group.name}
                    contacts={group.contacts}
                  />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-red-700 p-3 text-xs leading-relaxed text-red-200">
                No additional verified contact records are currently published.
              </p>
            )}

            <Link
              to="/contact#emergency"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white underline decoration-red-300 underline-offset-2 transition-colors hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-950"
            >
              View all contacts and sources
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </details>
      </div>
    </div>
  );
}
