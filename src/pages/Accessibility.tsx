import { Link } from 'react-router';
import SEO from '../components/SEO';

export default function Accessibility() {
  return (
    <>
      <SEO
        title="Accessibility"
        description="Accessibility information and known limitations for BetterLal-lo."
        keywords="BetterLal-lo accessibility, accessible civic portal"
      />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
          Inclusive access
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Accessibility</h1>
        <p className="mt-3 text-lg leading-relaxed text-gray-700">
          BetterLal-lo aims to keep public information usable on mobile, with a
          keyboard, and with assistive technology.
        </p>
        <div className="prose prose-gray mt-8 max-w-none">
          <h2>Current practices</h2>
          <ul>
            <li>
              Keyboard-focus styles are provided for links, buttons, and forms.
            </li>
            <li>A skip link moves keyboard users to the main content.</li>
            <li>
              Pages use headings, labelled regions, captions, and readable
              contrast.
            </li>
            <li>
              Emergency phone references use mobile-friendly <code>tel:</code>{' '}
              links.
            </li>
            <li>
              Weather and map features expose loading, unavailable, and offline
              states.
            </li>
            <li>
              Source and pending states are written as text rather than conveyed
              by color alone.
            </li>
          </ul>
          <h2>Known limitations</h2>
          <p>
            Some external government PDFs, maps, and linked services may not
            meet the same accessibility standard. Content translated into
            Ilocano is currently limited to interface text; longer source-backed
            guides may fall back to English until reviewed.
          </p>
          <h2>Report a barrier</h2>
          <p>
            Tell us the page, device or assistive technology, and the barrier
            you encountered through the{' '}
            <Link to="/contribute" className="font-semibold text-primary-700">
              contribution guide
            </Link>
            . Do not include sensitive personal information.
          </p>
        </div>
      </main>
    </>
  );
}
