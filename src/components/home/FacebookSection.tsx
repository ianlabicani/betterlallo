import { ExternalLink, Facebook } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { facebookPageUrl } from '../../data/navigation';
import { cn } from '../../lib/utils';

const FACEBOOK_MIN_WIDTH = 180;
const FACEBOOK_MAX_WIDTH = 500;

function createFacebookEmbedUrl(width: number) {
  const facebookEmbedUrl = new URL('https://www.facebook.com/plugins/page.php');
  facebookEmbedUrl.searchParams.set('href', facebookPageUrl);
  facebookEmbedUrl.searchParams.set('tabs', 'timeline');
  facebookEmbedUrl.searchParams.set('width', String(width));
  facebookEmbedUrl.searchParams.set('height', '600');
  facebookEmbedUrl.searchParams.set('small_header', 'false');
  facebookEmbedUrl.searchParams.set('adapt_container_width', 'true');
  facebookEmbedUrl.searchParams.set('hide_cover', 'false');
  facebookEmbedUrl.searchParams.set('show_facepile', 'false');
  return facebookEmbedUrl.toString();
}

export function FacebookFeedCard({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embedWidth, setEmbedWidth] = useState(FACEBOOK_MAX_WIDTH);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width;
      if (!width) return;

      const nextWidth = Math.min(
        FACEBOOK_MAX_WIDTH,
        Math.max(FACEBOOK_MIN_WIDTH, Math.floor(width))
      );
      setEmbedWidth(currentWidth =>
        currentWidth === nextWidth ? currentWidth : nextWidth
      );
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'mx-auto w-full max-w-[500px] overflow-hidden rounded-md border border-white/20 bg-white shadow-xl ring-1 ring-black/10',
        className
      )}
    >
      <iframe
        title="LGU Lal-lo Facebook page feed"
        src={createFacebookEmbedUrl(embedWidth)}
        width={embedWidth}
        height="600"
        className="block h-[600px] w-full"
        style={{ border: 'none', overflow: 'hidden' }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default function FacebookSection() {
  return (
    <section
      aria-labelledby="facebook-feed-title"
      className="border-t-4 border-accent-500 bg-primary-900 py-14 text-white sm:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2
              id="facebook-feed-title"
              className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Stay close to local updates
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-100 sm:text-lg">
              Follow the municipality’s public Facebook page for announcements,
              community activities, and updates from Lal-lo.
            </p>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-accent-500 px-5 py-3 font-semibold text-gray-900 shadow-sm transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              Open the LGU Lal-lo Facebook page
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <FacebookFeedCard className="mt-8 sm:mt-10" />
        </div>
      </div>
    </section>
  );
}
