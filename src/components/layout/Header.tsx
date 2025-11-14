'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeSwitcher } from '../theme/theme-switcher';
import { ThemeSwitchMode } from '../theme/theme-switch-mode';
import { apiUrl } from '@/lib/api';

/**
 * Dark/Light support with shadcn tokens:
 * - Uses Tailwind + shadcn semantic tokens: bg-background, text-foreground, border-border,
 *   bg-card, text-muted-foreground, ring, primary, etc.
 * - Ensure your app has Tailwind `darkMode: "class"` and is wrapped in the shadcn ThemeProvider.
 *
 * Visual layout is preserved; only color utilities were changed to theme-aware tokens.
 */

type AdminHeaderProps = {
  onToggleSidebar?: () => void;
  title?: string;
  showSearch?: boolean;
  onLogout?: () => Promise<void> | void;
  logoSrc?: string;
};

export default function Header({
  onToggleSidebar,
  title = 'Admin',
  showSearch = false,
  onLogout,
  logoSrc = '/icons/opura-logo.png',
}: AdminHeaderProps) {
  const [q, setQ] = useState('');
  const [loadingLogout, setLoadingLogout] = useState(false);

  async function handleLogout() {
    try {
      setLoadingLogout(true);
      if (onLogout) {
        await onLogout();
      } else {
        // Optional: call backend logout endpoint if you have one
        try {
          await fetch(apiUrl('/api/auth/logout'), {
            method: 'POST',
            credentials: 'include',
          });
        } catch (err) {
          console.warn('Logout API call failed:', err);
        }
        
        // Clear all local storage including JWT token
        localStorage.clear();
        if (typeof window !== 'undefined') window.location.href = '/sign-in';
      }
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
      setLoadingLogout(false);
    }
  }

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center gap-3">
          {/* Sidebar toggle (mobile) and TechStyle Boutique name */}
          <button
            aria-label="Toggle Sidebar"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-2 text-xl font-semibold text-foreground">TechStyle Boutique</span>

          {/* Example brand (kept commented if you prefer) */}
          {/*
          <Link href="/admin" className="flex items-center gap-2">
            <span className="inline-grid h-9 w-9 place-items-center overflow-hidden rounded-md ring-1 ring-border bg-card">
              <Image
                src={logoSrc}
                alt="Opura Admin"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                priority
              />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">Opura Admin</p>
            </div>
          </Link>
          */}

          {/* Divider */}
          {/*
          <div className="mx-2 hidden h-6 w-px bg-border md:block" />
          */}

          {/* Page title (desktop) */}
          {/*
          <h1 className="hidden text-sm font-medium text-foreground md:block">
            {title}
          </h1>
          */}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search (desktop) */}
          {showSearch && (
            <div className="relative hidden w-full max-w-sm md:block">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" strokeWidth="2" />
                </svg>
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Removed duplicate TechStyle Boutique name from right side */}
            {/*
            <Link
              href="/"
              className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground md:inline-flex"
            >
              View Site
            </Link>
            */}

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0"
                />
              </svg>
            </button>

            {/* <ThemeSwitcher /> */}
            <ThemeSwitchMode />

            {/* Profile dropdown (minimal) */}
            <div className="relative">
              <details className="group">
                <summary className="list-none inline-flex h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-full bg-accent px-3 text-sm font-medium text-accent-foreground hover:ring-2 hover:ring-ring/40">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    AA
                  </span>
                  <svg
                    className="h-4 w-4 text-muted-foreground transition group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M6 9l6 6 6-6" />
                  </svg>
                </summary>

                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    Signed in as admin@example.com
                  </div>
                  <div className="border-t border-border" />
                  <Link
                    href="/admin/account"
                    className="block px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loadingLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 disabled:opacity-60"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
                      />
                    </svg>
                    {loadingLogout ? 'Logging out…' : 'Logout'}
                  </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}