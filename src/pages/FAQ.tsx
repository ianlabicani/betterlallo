import { Link } from 'react-router';
import SEO from '../components/SEO';

const questions = [
  {
    question: 'Is BetterLal-lo the official municipal government website?',
    answer: (
      <>
        No. BetterLal-lo is an independent, community-run information portal. It
        links to official sources but does not speak for the Municipal
        Government of Lal-lo or accept applications and payments.
      </>
    ),
  },
  {
    question: 'Can I use the portal to apply, pay, or file a report?',
    answer: (
      <>
        Not currently. The portal provides guides and source links. Confirm the
        current transaction channel with the responsible office, request an
        official receipt for payments, and do not send personal documents to an
        unofficial intermediary.
      </>
    ),
  },
  {
    question: 'How are contacts, updates, and statistics reviewed?',
    answer: (
      <>
        Published records include an attributable source, jurisdiction, period
        where available, and last-reviewed date. The portal keeps a record
        pending when the source does not establish a local detail.
      </>
    ),
  },
  {
    question: 'Why does a page say that a field is pending?',
    answer: (
      <>
        A pending label means the evidence needed for that exact Lal-lo detail
        was not found or approved for publication. It is intentional: fees,
        requirements, schedules, phone numbers, and procedures are not guessed.
      </>
    ),
  },
  {
    question: 'Where can I find emergency contact references?',
    answer: (
      <>
        Open the{' '}
        <Link
          to="/contact#emergency"
          className="font-semibold text-primary-700 underline"
        >
          emergency and contact hub
        </Link>
        . Follow current responder instructions and confirm channel availability
        before relying on a published number.
      </>
    ),
  },
  {
    question: 'How can I suggest a correction?',
    answer: (
      <>
        Use the{' '}
        <Link
          to="/contribute"
          className="font-semibold text-primary-700 underline"
        >
          contribution guide
        </Link>{' '}
        to send the exact source, field, period, and correction. Maintainers
        review changes before they are added to the static site.
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <>
      <SEO
        title="Frequently asked questions"
        description="Answers about BetterLal-lo’s scope, source policy, emergency information, and contributions."
        keywords="BetterLal-lo FAQ, Lal-lo civic portal, source policy"
      />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
            Help and scope
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Frequently asked questions
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-gray-700">
            Short answers about what BetterLal-lo publishes and how to use it
            safely.
          </p>
        </div>
        <div className="space-y-3">
          {questions.map(item => (
            <details
              key={item.question}
              className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <summary className="cursor-pointer list-none pr-8 font-semibold text-gray-900 marker:hidden focus:outline-none focus:ring-2 focus:ring-primary-500">
                <span className="group-open:text-primary-800">
                  {item.question}
                </span>
                <span
                  className="float-right text-xl text-primary-700"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </main>
    </>
  );
}
