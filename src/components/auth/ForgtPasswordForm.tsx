'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';

type Slide = {
  title: string;
  description: string;
  stats?: { value: string; label: string }[];
};

const SLIDES: Slide[] = [
  {
    title: 'Realtime collaboration',
    description: 'Work together seamlessly across projects and teams.',
    stats: [
      { value: '99.9%', label: 'Uptime' },
      { value: '4.9/5', label: 'Rating' },
      { value: '+1k', label: 'Teams' },
    ],
  },
  {
    title: 'Secure by default',
    description: 'SSO, 2FA, and SOC 2 Type II compliant infrastructure.',
    stats: [
      { value: 'AES-256', label: 'Encryption' },
      { value: 'ISO 27001', label: 'Aligned' },
      { value: 'GDPR', label: 'Ready' },
    ],
  },
  {
    title: 'Insightful dashboards',
    description: 'Beautiful reports for confident, fast decisions.',
    stats: [
      { value: '12+', label: 'Templates' },
      { value: '1m+', label: 'Events/day' },
      { value: '<200ms', label: 'Latency' },
    ],
  },
];

export default function ForgotPasswordForm() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  // Slider state (same as sign-in)
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;
    if (dx > threshold) setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    else if (dx < -threshold) setIndex((i) => (i + 1) % SLIDES.length);
    touchStartX.current = null;
  };

  function validate(): string | null {
    if (!email.trim()) return 'Please enter your email.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email.';
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    try {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      setSent(true);
    } catch (e) {
      setError('Could not send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[radial-gradient(80%_60%_at_50%_-10%,hsl(var(--muted))/0.35_0%,hsl(var(--background))_45%)] dark:bg-[radial-gradient(80%_60%_at_50%_-10%,hsl(var(--muted))/0.25_0%,hsl(var(--background))_45%)]">
      <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-2 md:items-center lg:gap-8">
        {/* Left: Forgot Password Card */}
        <div className="order-1 md:order-1 relative">
          {/* Brand */}
          <div className="pointer-events-none absolute -top-16 left-0 flex items-center gap-1">
            <div className="relative h-15 w-15 overflow-hidden rounded-lg bg-background">
              <Image
                src="/images/opura-logo.png"
                alt="Logo"
                fill
                sizes="36px"
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="text-l font-semibold tracking-tight text-foreground">
              Opura Admin
            </span>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-[0_20px_60px_-20px_rgba(2,6,23,0.08)] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="p-6 sm:p-11">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Forgot your password?
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter your email and we’ll send you a secure reset link.
                </p>
              </div>

              {sent ? (
                <div className="space-y-5">
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-400">
                    If an account exists for {email}, a reset link has been sent. Please
                    check your inbox.
                  </div>
                  <button
                    onClick={() => router.push('/sign-in')}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-ring/20"
                  >
                    Back to sign in
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium tracking-wide text-muted-foreground"
                    >
                      Email
                    </label>
                    <div className="group relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 transition-colors group-focus-within:text-foreground" />
                      <input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-xl border border-input bg-background pl-10 pr-3 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-ring/20 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending reset link…
                      </>
                    ) : (
                      'Send reset link'
                    )}
                  </button>

                  {/* Secondary actions */}
                  <div className="flex items-center justify-between text-sm">
                    <a href="/sign-in" className="text-primary hover:underline">
                      Back to sign in
                    </a>
                    <a href="/sign-up" className="text-muted-foreground hover:text-foreground">
                      Create account
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right: Slider Panel */}
        <div className="order-2 md:order-2">
          <div
            className="relative overflow-hidden rounded-3xl border border-border bg-card text-card-foreground p-0 shadow-[0_25px_80px_-30px_rgba(2,6,23,0.12)] dark:shadow-[0_25px_80px_-30px_rgba(0,0,0,0.6)]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Mesh gradient backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background:radial-gradient(120%_60%_at_10%_10%,hsl(var(--primary))/12_0%,transparent_40%),radial-gradient(100%_60%_at_90%_20%,hsl(var(--secondary))/14_0%,transparent_35%),radial-gradient(120%_80%_at_50%_110%,hsl(var(--accent))/18_0%,transparent_35%)] dark:opacity-60"
            />
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rotate-6 rounded-3xl bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15 blur-xl" />
            <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 -rotate-6 rounded-3xl bg-gradient-to-br from-cyan-400/15 to-indigo-400/15 blur-xl" />

            {/* Slides */}
            <div className="relative h-full">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {SLIDES.map((slide, i) => (
                  <section
                    key={i}
                    className="min-w-full px-6 py-8 sm:px-8 sm:py-10"
                    aria-roledescription="slide"
                    aria-label={slide.title}
                  >
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-border bg-background">
                        <Image
                          src="/images/opura-logo.png"
                          alt="Logo"
                          fill
                          sizes="40px"
                          className="object-contain p-1.5"
                          priority
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Opura Product
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Modern tools for teams that ship
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground">
                      {slide.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {slide.description}
                    </p>

                    {slide.stats && (
                      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                        {slide.stats.map((s, si) => (
                          <div
                            key={si}
                            className="rounded-xl border border-border bg-card p-3"
                          >
                            <div className="text-xl font-semibold text-foreground">
                              {s.value}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 rounded-2xl border border-border bg-background/70 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                        <p className="text-sm text-foreground">
                          SOC 2 Type II compliant infrastructure
                        </p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {/* Dots */}
              <div className="mb-5 mt-3 flex items-center justify-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition ${
                      index === i
                        ? 'bg-foreground'
                        : 'bg-muted hover:bg-muted-foreground/50'
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3 text-center text-sm">
          <a href="/privacy-policy" className="underline underline-offset-4 text-foreground">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}