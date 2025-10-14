'use client';

import Link from 'next/link';

type FooterProps = {
  env?: 'production' | 'staging' | 'development';
  version?: string; // e.g. "v1.3.2" or commit hash
  uptimeText?: string; // optional "Up 4h 12m"
  leftText?: string; // optional custom label
  showLegalLinks?: boolean;
};

/**
 * Theme-aware footer using shadcn/tailwind tokens.
 * - Ensure Tailwind has darkMode: "class" and your app is wrapped with shadcn ThemeProvider.
 * - Colors now use semantic tokens: bg-background, text-foreground, border-border, etc.
 */
const ENV_COLORS: Record<NonNullable<FooterProps['env']>, string> = {
  production: 'bg-emerald-600',
  staging: 'bg-amber-600',
  development: 'bg-sky-600',
};

export default function Footer({
  env = 'development',
  version = 'v1.0.0',
  uptimeText = '11:00:23',
  leftText = 'Opura Admin',
  showLegalLinks = true,
}: FooterProps) {
  const envColor = ENV_COLORS[env] || 'bg-muted-foreground';

  return (
    <footer className="border-t border-border bg-background/90 backdrop-blur">
      <div className="mx-auto px-3">
        <div className="flex h-12 items-center gap-3 text-xs text-muted-foreground">
          {/* Left: brand/status */}
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`inline-flex h-2.5 w-2.5 rounded-full ${envColor} shadow-sm`}
              title={env}
              aria-label={env}
            />
            <span className="truncate">
              {leftText}
              {version ? (
                <span className="ml-2 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground/80">
                  {version}
                </span>
              ) : null}
            </span>
          </div>

          {/* Middle: uptime or breadcrumbs placeholder */}
          <div className="hidden flex-1 items-center sm:flex">
            {uptimeText ? (
              <span className="inline-flex items-center gap-1">
                <svg
                  className="h-3.5 w-3.5 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM11 6h2v6h-2zm1 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
                <span className="text-muted-foreground">{uptimeText}</span>
              </span>
            ) : (
              <div className="h-4" />
            )}
          </div>

          {/* Right: quick links */}
          <div className="ml-auto flex items-center gap-3">
            {showLegalLinks && (
              <>
                <Link
                  href="/privacy-policy"
                  className="hover:text-foreground"
                >
                  Privacy
                </Link>
                <span className="text-muted">•</span>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-foreground"
                >
                  Terms
                </Link>
              </>
            )}
            <span className="hidden text-muted sm:inline">•</span>
            <a
              href="mailto:support@opura-admin.com"
              className="hidden hover:text-foreground sm:inline"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}