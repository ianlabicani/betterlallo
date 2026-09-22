import { ExternalLink, Mail, MapPin, Phone, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import { civicContacts } from '../data/civicRecords';
import { lalloLocation } from '../data/location';

const contactGroups = [
  {
    id: 'emergency',
    title: 'Emergency and disaster response',
    description:
      'These are provincial or program-level channels published for disaster response. They do not replace local emergency instructions or a current assessment of the situation.',
    category: 'Emergency',
  },
  {
    id: 'health',
    title: 'Health',
    description:
      'The public facility contacts below come from a national health directory. Confirm service availability, schedules, and fees before visiting.',
    category: 'Health',
  },
  {
    id: 'agriculture',
    title: 'Agriculture and fisheries',
    description:
      'The agriculture-office channel is published in a DA/PCAF directory. Confirm the current contact before sending documents or making a trip.',
    category: 'Agriculture',
  },
  {
    id: 'employment',
    title: 'Employment support',
    description:
      'The PESO record is from a 2023 DOLE directory snapshot and should be reconfirmed before use.',
    category: 'Employment',
  },
];

function phoneHref(value: string) {
  const firstNumber = value.split('/')[0]?.trim() ?? value;
  return `tel:${firstNumber.replace(/[^+\d]/g, '')}`;
}

function ContactCard({ contact }: { contact: (typeof civicContacts)[number] }) {
  const Icon = contact.channel === 'phone' ? Phone : Mail;
  const href =
    contact.channel === 'phone'
      ? phoneHref(contact.value)
      : `mailto:${contact.value}`;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Icon
            className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
            <p className="mt-1 text-sm font-medium text-primary-800">
              <a
                href={href}
                className="underline underline-offset-2 hover:text-primary-950 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {contact.value}
              </a>
            </p>
          </div>
        </div>
        <VerificationBadge status={contact.status} />
      </div>
      {contact.description && (
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          {contact.description}
        </p>
      )}
      <dl className="mt-4 space-y-1 text-sm text-gray-600">
        <div>
          <dt className="inline font-semibold text-gray-800">Scope:</dt>{' '}
          <dd className="inline">{contact.scope}</dd>
        </div>
        {contact.availability && (
          <div>
            <dt className="inline font-semibold text-gray-800">
              Availability:
            </dt>{' '}
            <dd className="inline">{contact.availability}</dd>
          </div>
        )}
      </dl>
      <SourceMeta source={contact.source} />
    </article>
  );
}

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact and emergency information"
        description="Source-backed emergency, health, agriculture, and employment contacts for Lal-lo, Cagayan, with pending municipal details clearly marked."
        keywords="Lal-lo emergency contacts, PDRRMO, RHU, municipal contacts, hotlines"
      />
      <main>
        <section className="bg-amber-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3 text-amber-900">
                <ShieldAlert className="h-8 w-8" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Contact hub
                </p>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Verified contacts and emergency references
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-gray-700">
                Use the published source and review date on every contact. In an
                emergency, follow current instructions from responders and
                confirm that a phone channel is available.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#emergency"
                  className="inline-flex items-center gap-2 rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Emergency contacts
                </a>
                <Link
                  to="/government/directory"
                  className="inline-flex items-center gap-2 rounded-md border border-amber-800 px-4 py-2 font-semibold text-amber-900 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2"
                >
                  Municipal office directory
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10">
          <div className="space-y-10">
            {contactGroups.map(group => {
              const contacts = civicContacts.filter(
                contact => contact.category === group.category
              );

              return (
                <section
                  key={group.id}
                  id={group.id}
                  className="scroll-mt-36"
                  aria-labelledby={`${group.id}-heading`}
                >
                  <div className="mb-5 max-w-3xl">
                    <h2
                      id={`${group.id}-heading`}
                      className="text-2xl font-bold text-gray-900"
                    >
                      {group.title}
                    </h2>
                    <p className="mt-2 text-gray-600">{group.description}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {contacts.map(contact => (
                      <ContactCard key={contact.id} contact={contact} />
                    ))}
                  </div>
                </section>
              );
            })}

            <section
              id="municipal-contact"
              aria-labelledby="municipal-contact-heading"
            >
              <div className="mb-5 max-w-3xl">
                <h2
                  id="municipal-contact-heading"
                  className="text-2xl font-bold text-gray-900"
                >
                  Municipal government contact
                </h2>
                <p className="mt-2 text-gray-600">
                  A current municipal hall phone number, email address, office
                  hours, and evacuation procedure have not been published in a
                  source approved for this portal. Those fields remain pending;
                  BetterLal-lo does not guess them.
                </p>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <article className="rounded-lg border border-dashed border-amber-300 bg-amber-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    Municipal details awaiting a current source
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
                    <li>Municipal hall phone and email</li>
                    <li>Office hours and appointment instructions</li>
                    <li>Municipal evacuation procedures and local hotlines</li>
                  </ul>
                  <Link
                    to="/contribute"
                    className="mt-5 inline-flex font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
                  >
                    Suggest a correction or source
                  </Link>
                </article>
                <article
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                  id="map"
                >
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-5 w-5 text-primary-700"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Map reference for Lal-lo Municipal Hall
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        Use the map reference for orientation only. Verify the
                        destination and office availability before traveling.
                      </p>
                      <a
                        href={
                          lalloLocation?.source.url ??
                          'https://www.openstreetmap.org/'
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
                      >
                        Open map reference
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  {lalloLocation && (
                    <SourceMeta source={lalloLocation.source} />
                  )}
                </article>
              </div>
            </section>

            <section
              className="rounded-lg border border-primary-100 bg-primary-50 p-6"
              aria-labelledby="portal-contact-heading"
            >
              <h2
                id="portal-contact-heading"
                className="text-xl font-bold text-gray-900"
              >
                About BetterLal-lo contact
              </h2>
              <p className="mt-2 max-w-3xl text-gray-700">
                BetterLal-lo is a community-run portal, not an official
                government office. For corrections, send a source through the
                contribution guide rather than treating this site as an
                emergency dispatcher or transaction channel.
              </p>
              <Link
                to="/contribute"
                className="mt-4 inline-flex font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
              >
                Open the contribution guide
              </Link>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
