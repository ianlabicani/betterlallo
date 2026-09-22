export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-primary-800 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      Skip to main content
    </a>
  );
}
