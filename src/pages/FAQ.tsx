import { Link } from 'react-router';
import SEO from '../components/SEO';
import { publicChatFaqs } from '../data/publicChatKnowledge';

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
          {publicChatFaqs.map(item => (
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
                {item.answer}{' '}
                {item.link && (
                  <Link
                    to={item.link.href}
                    className="font-semibold text-primary-700 underline"
                  >
                    {item.link.label}
                  </Link>
                )}
              </p>
            </details>
          ))}
        </div>
      </main>
    </>
  );
}
