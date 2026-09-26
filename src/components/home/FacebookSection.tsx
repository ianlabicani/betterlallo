import {
  CalendarDays,
  ExternalLink,
  Facebook,
  Megaphone,
  MessageCircle,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { facebookPageUrl } from '../../data/navigation';
import { cn } from '../../lib/utils';

const FACEBOOK_MIN_WIDTH = 180;
const FACEBOOK_MAX_WIDTH = 500;
const FACEBOOK_HEIGHT = 700;

function createFacebookEmbedUrl(width: number) {
  const facebookEmbedUrl = new URL('https://www.facebook.com/plugins/page.php');
  facebookEmbedUrl.searchParams.set('href', facebookPageUrl);
  facebookEmbedUrl.searchParams.set('tabs', 'timeline');
  facebookEmbedUrl.searchParams.set('width', String(width));
  facebookEmbedUrl.searchParams.set('height', String(FACEBOOK_HEIGHT));
  facebookEmbedUrl.searchParams.set('small_header', 'false');
  facebookEmbedUrl.searchParams.set('adapt_container_width', 'true');
  facebookEmbedUrl.searchParams.set('hide_cover', 'false');
  facebookEmbedUrl.searchParams.set('show_facepile', 'true');
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
    <div ref={containerRef} className={cn('w-full max-w-[500px]', className)}>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06),0_8px_28px_rgba(0,0,0,0.1)]">
        <iframe
          title="LGU Lal-lo Facebook page — community updates"
          src={createFacebookEmbedUrl(embedWidth)}
          width={embedWidth}
          height={FACEBOOK_HEIGHT}
          className="block h-[700px] w-full"
          style={{ border: 'none', overflow: 'hidden' }}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <p className="mt-3 text-center text-xs text-gray-500">
        Can’t see the feed?{' '}
        <a
          href={facebookPageUrl}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
        >
          Open it on Facebook
        </a>
      </p>
    </div>
  );
}

export default function FacebookSection() {
  return (
    <section
      aria-labelledby="facebook-feed-title"
      className="border-t border-gray-200 bg-primary-50 py-12 sm:py-14"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,31.25rem)] lg:gap-16">
          <div className="max-w-xl lg:pt-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-50 px-3 py-1.5 text-sm font-semibold text-secondary-700">
              <Facebook className="h-4 w-4" aria-hidden="true" />
              Lal-lo on Facebook
            </div>
            <h2
              id="facebook-feed-title"
              className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"
            >
              Stay close to local updates
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-gray-600">
              Follow the municipality’s public Facebook page for announcements,
              community activities, and updates from Lal-lo.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <Megaphone
                  className="mt-0.5 h-5 w-5 shrink-0 text-secondary-600"
                  aria-hidden="true"
                />
                <span>Municipal announcements and public notices</span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarDays
                  className="mt-0.5 h-5 w-5 shrink-0 text-secondary-600"
                  aria-hidden="true"
                />
                <span>Community activities and local events</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-secondary-600"
                  aria-hidden="true"
                />
                <span>Recent posts from the LGU’s public page</span>
              </li>
            </ul>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-primary-700 px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              Open the LGU Lal-lo Facebook page
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <FacebookFeedCard className="justify-self-center lg:justify-self-end" />
        </div>
      </div>
    </section>
  );
}
