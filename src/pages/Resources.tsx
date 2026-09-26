import {
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import { verifiedResourceGroups } from '../data/verifiedResources';
import type {
  ResourceCollectionLink,
  ResourceLinkType,
  VerifiedResourceEntry,
} from '../types/civic';

const actionClasses =
  'inline-flex items-center gap-2 rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';

const secondaryActionClasses =
  'inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-primary-400 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';

function ActionIcon({ linkType }: { linkType: ResourceLinkType }) {
  if (linkType === 'phone') {
    return <Phone className="h-4 w-4" aria-hidden="true" />;
  }
  if (linkType === 'email') {
    return <Mail className="h-4 w-4" aria-hidden="true" />;
  }
  if (linkType === 'external') {
    return <ExternalLink className="h-4 w-4" aria-hidden="true" />;
  }
  return <ArrowRight className="h-4 w-4" aria-hidden="true" />;
}

function ResourceAction({
  href,
  label,
  linkType,
  secondary = false,
}: {
  href: string;
  label: string;
  linkType: ResourceLinkType;
  secondary?: boolean;
}) {
  const className = secondary ? secondaryActionClasses : actionClasses;

  if (linkType === 'internal') {
    return (
      <Link to={href} className={className}>
        {label}
        <ActionIcon linkType={linkType} />
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target={linkType === 'external' ? '_blank' : undefined}
      rel={linkType === 'external' ? 'noreferrer' : undefined}
    >
      {label}
      <ActionIcon linkType={linkType} />
    </a>
  );
}

function CollectionLink({ link }: { link: ResourceCollectionLink }) {
  return (
    <li className="flex min-h-full min-w-0 flex-col rounded-lg border border-gray-200 bg-gray-50/60 p-4 transition-colors hover:border-primary-300 hover:bg-white">
      {link.linkType === 'internal' ? (
        <Link
          to={link.href}
          className="group inline-flex max-w-full items-start gap-1 text-sm font-semibold leading-snug text-primary-700 underline underline-offset-2 hover:text-primary-950 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {link.label}
          <ArrowRight
            className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex max-w-full items-start gap-1 text-sm font-semibold leading-snug text-primary-700 underline underline-offset-2 hover:text-primary-950 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {link.label}
          <ExternalLink
            className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      )}
      <p className="mt-1 max-w-[32ch] text-xs leading-relaxed text-gray-500">
        {link.description}
      </p>
    </li>
  );
}

function ResourceCard({ resource }: { resource: VerifiedResourceEntry }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {resource.title}
        </h3>
        <VerificationBadge status={resource.status} compact />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
        {resource.description}
      </p>
      <SourceMeta source={resource.source} compact />

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <ResourceAction
          href={resource.href}
          label={resource.actionLabel}
          linkType={resource.linkType}
        />
        {resource.portalHref && resource.portalLabel && (
          <ResourceAction
            href={resource.portalHref}
            label={resource.portalLabel}
            linkType="internal"
            secondary
          />
        )}
      </div>
    </article>
  );
}

export default function Resources() {
  return (
    <>
      <SEO
        title="Verified resources"
        description="A focused directory of verified BetterLal-lo contacts, services, public records, data, heritage references, and updates."
        keywords="BetterLal-lo verified resources, Lal-lo contacts, public records, services, Cagayan"
      />
      <main>
        <section className="bg-primary-50 py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-1 h-8 w-8 shrink-0 text-primary-700"
                aria-hidden="true"
              />
              <div className="max-w-3xl">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
                  Start with trusted information
                </p>
                <h1 className="text-3xl font-bold text-gray-900">
                  Verified resources
                </h1>
                <p className="mt-3 text-lg leading-relaxed text-gray-700">
                  Find the most useful BetterLal-lo resources quickly. Each card
                  keeps the essential action visible; detailed source
                  information remains on the linked page or official source.
                </p>
                <Link
                  to="/government/overview/about-lallo"
                  className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Learn how information is verified
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <nav
              className="mt-8 overflow-x-auto"
              aria-label="Verified resource sections"
            >
              <ul className="flex min-w-max gap-2 pb-1">
                {verifiedResourceGroups.map(group => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="inline-flex rounded-full border border-primary-200 bg-white px-3 py-2 text-sm font-semibold text-primary-800 hover:border-primary-400 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-10">
          <div className="space-y-12">
            {verifiedResourceGroups.map(group => {
              const resourceCount = group.resources.length;
              const countLabel =
                resourceCount > 0
                  ? `${resourceCount} verified resource${resourceCount === 1 ? '' : 's'}`
                  : 'Portal guides';

              return (
                <section
                  key={group.id}
                  id={group.id}
                  className="scroll-mt-36"
                  aria-labelledby={`${group.id}-heading`}
                >
                  <div className="border-b border-gray-200 pb-6">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2
                          id={`${group.id}-heading`}
                          className="text-2xl font-bold text-gray-900"
                        >
                          {group.title}
                        </h2>
                        <span className="text-sm font-semibold text-gray-500">
                          {countLabel}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{group.description}</p>
                    </div>

                    {group.collectionLinks.length > 0 && (
                      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {group.collectionLinks.map(link => (
                          <CollectionLink key={link.id} link={link} />
                        ))}
                      </ul>
                    )}
                  </div>

                  {group.resources.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {group.resources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  )}

                  {group.pendingMessage && (
                    <div className="mt-5 rounded-lg border border-dashed border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
                      {group.pendingMessage}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
