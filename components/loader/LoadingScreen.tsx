'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useSiteConfig } from '@/hooks/use-site-config';
import { parseWeddingDate } from '@/lib/wedding-date';

interface LoadingScreenProps {
  onComplete: () => void;
  onFadeStart?: () => void;
}

const COUNTDOWN_BOXES = [
  { src: '/envelope/debut (1).jpg' },
  { src: '/envelope/debut (2).jpg' },
  { src: '/envelope/debut (3).jpg' },
];

const MAIN_DESKTOP_IMAGE = '/desktop-background/debut (7).webp';
const MAIN_MOBILE_IMAGE = '/mobile-background/debut (3).webp';
const STAGGER_DELAY_MS = 4000;
const BOX_TRANSITION_MS = 1200;
const TOTAL_DURATION_MS = COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;
const FADE_OUT_MS = 500;
const LOADING_MESSAGES = [
  'Preparing your debut invitation',
  'Setting the celebration stage',
  'Gathering cherished moments',
  'Almost ready to celebrate',
];
const MESSAGE_CYCLE_MS = 3200;
const MESSAGE_FADE_MS = 450;

function buildDebutDateTime(dateStr: string | undefined, timeStr: string | undefined): Date {
  const parsed = parseWeddingDate(dateStr);
  const month = parsed.month.charAt(0) + parsed.month.slice(1).toLowerCase();
  const datePart = `${month} ${parsed.day}, ${parsed.year}`;
  const debut = new Date(`${datePart} ${timeStr ?? '12:00 PM'}`);
  return Number.isNaN(debut.getTime()) ? new Date(datePart) : debut;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onFadeStart }) => {
  const siteConfig = useSiteConfig();
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());
  const [messageIndex, setMessageIndex] = useState(0);
  const [messageVisible, setMessageVisible] = useState(true);

  const debutDate = useMemo(
    () =>
      buildDebutDateTime(
        siteConfig.ceremony.date ?? siteConfig.wedding.date,
        siteConfig.ceremony.time ?? siteConfig.wedding.time,
      ),
    [
      siteConfig.ceremony.date,
      siteConfig.ceremony.time,
      siteConfig.wedding.date,
      siteConfig.wedding.time,
    ],
  );

  const countdownNumbers = useMemo(
    () => [
      String(debutDate.getMonth() + 1).padStart(2, '0'),
      String(debutDate.getDate()).padStart(2, '0'),
      String(debutDate.getFullYear()).slice(-2),
    ],
    [debutDate],
  );

  const countdownLabels = ['MONTH', 'DAY', 'YEAR'];

  const countdown = useMemo(() => {
    const diff = debutDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [debutDate, now]);

  const countdownText = useMemo(() => {
    const { days } = countdown;
    if (days === 0) return 'TODAY IS THE DEBUT';
    if (days === 1) return 'ONE DAY TO GO';
    if (days >= 28 && days <= 31) return 'ONE MONTH TO GO';
    if (days >= 58 && days <= 62) return 'TWO MONTHS TO GO';
    if (days >= 88 && days <= 93) return 'THREE MONTHS TO GO';
    if (days >= 118 && days <= 123) return 'FOUR MONTHS TO GO';
    if (days >= 148 && days <= 153) return 'FIVE MONTHS TO GO';
    return `${days} DAYS TO GO`;
  }, [countdown.days]);

  const debutantLabel = `${siteConfig.couple.debutNickname} 18th Birthday`;

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let swapTimer: ReturnType<typeof setTimeout>;

    const cycleTimer = setInterval(() => {
      setMessageVisible(false);
      swapTimer = setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        setMessageVisible(true);
      }, MESSAGE_FADE_MS);
    }, MESSAGE_CYCLE_MS);

    return () => {
      clearInterval(cycleTimer);
      clearTimeout(swapTimer);
    };
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      onFadeStart?.();
      setFadeOut(true);
      setTimeout(onComplete, FADE_OUT_MS);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete, onFadeStart]);

  return (
    <div
      className={`loading-screen fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-busy={!fadeOut}
      aria-label="Loading invitation"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={MAIN_DESKTOP_IMAGE}
          alt=""
          fill
          className="hidden object-cover object-center scale-[1.02] md:block"
          sizes="100vw"
          priority
        />
        <Image
          src={MAIN_MOBILE_IMAGE}
          alt=""
          fill
          className="object-cover object-center scale-[1.02] md:hidden"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              color-mix(in srgb, var(--color-motif-deep) 55%, transparent) 0%,
              color-mix(in srgb, var(--color-motif-deep) 18%, transparent) 22%,
              transparent 42%,
              transparent 62%,
              color-mix(in srgb, var(--color-motif-deep) 22%, transparent) 82%,
              color-mix(in srgb, var(--color-motif-deep) 62%, transparent) 100%
            )`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 35%, color-mix(in srgb, var(--color-motif-deep) 45%, transparent) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Ghost date watermark */}
      <div
        className="pointer-events-none absolute right-[clamp(0.5rem,3vw,2rem)] top-1/2 z-[1] flex -translate-y-1/2 select-none flex-col items-center gap-1 font-[family-name:var(--font-cinzel)] text-[clamp(3rem,12vw,7rem)] font-bold leading-[0.82] tracking-wide text-motif-deep/[0.07]"
        aria-hidden="true"
      >
        {countdownNumbers.map((num, i) => (
          <React.Fragment key={countdownLabels[i]}>
            <span className="tabular-nums">{num}</span>
            {i < countdownNumbers.length - 1 && (
              <span className="block h-px w-[clamp(1.25rem,4vw,2.5rem)] bg-motif-deep/10" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
        {/* Top: countdown header */}
        <div className="flex w-full flex-shrink-0 flex-col items-center px-4 pt-6 sm:px-6 sm:pt-8 md:pt-10">
          <div className="mx-auto mb-4 mt-4 flex w-full max-w-lg items-center justify-center gap-3 sm:mt-5 sm:gap-4 md:mt-6">
            <span className="hidden h-px w-10 flex-shrink-0 bg-gradient-to-r from-transparent to-motif-yellow sm:block sm:w-14" />
            <p className="text-center font-sans text-[10px] uppercase tracking-[0.32em] text-white sm:text-xs sm:tracking-[0.42em]">
              Save the date for the debut
            </p>
            <span className="hidden h-px w-10 flex-shrink-0 bg-gradient-to-l from-transparent to-motif-yellow sm:block sm:w-14" />
          </div>

          <h2
            className="max-w-lg px-2 text-center font-[family-name:var(--font-cinzel)] text-2xl uppercase leading-tight tracking-[0.08em] text-white sm:text-3xl sm:tracking-[0.12em] md:text-4xl lg:text-[2.75rem]"
            style={{
              textShadow:
                '0 2px 16px color-mix(in srgb, var(--color-motif-deep) 55%, transparent), 0 0 48px color-mix(in srgb, var(--color-motif-yellow) 18%, transparent)',
            }}
          >
            {countdownText}
          </h2>

          {countdown.days > 0 && (
            <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.28em] text-white/90 sm:text-xs">
              {countdown.days}d&nbsp;&nbsp;{countdown.hours}h&nbsp;&nbsp;{countdown.minutes}m remaining
            </p>
          )}
        </div>

        <div className="min-h-[10vh] flex-1" />

        {/* Photo countdown boxes */}
        <div className="flex flex-shrink-0 items-stretch justify-center gap-3 px-3 py-4 sm:gap-5 sm:px-4 md:gap-6">
          {COUNTDOWN_BOXES.map((item, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={item.src}
                className="relative aspect-[3/4] max-w-[28vw] flex-1 sm:max-w-[148px] md:max-w-[168px]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.94)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-sm shadow-[0_8px_32px_color-mix(in_srgb,var(--color-motif-deep)_40%,transparent)]">
                  <Image
                    src={item.src}
                    alt={debutantLabel}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 28vw, 168px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, color-mix(in srgb, var(--color-motif-deep) 72%, transparent) 0%, transparent 55%)',
                    }}
                  />
                  <div className="absolute bottom-2 right-2 flex flex-col items-end sm:bottom-3 sm:right-3">
                    <span
                      className="select-none font-[family-name:var(--font-cinzel)] text-5xl font-black leading-none text-white sm:text-6xl md:text-7xl lg:text-8xl"
                      style={{
                        textShadow:
                          '0 2px 10px color-mix(in srgb, var(--color-motif-deep) 70%, transparent)',
                      }}
                    >
                      {countdownNumbers[i]}
                    </span>
                    <span className="mt-0.5 text-[8px] uppercase tracking-[0.22em] text-white sm:text-[9px]">
                      {countdownLabels[i]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: name + progress */}
        <div className="flex w-full flex-shrink-0 flex-col items-center px-4 pb-8 pt-6 sm:pb-10 sm:pt-8">
          <div className="mb-1 flex items-center gap-3">
            <span className="h-px w-8 bg-motif-yellow/50 sm:w-12" />
            <span
              className="font-[family-name:var(--font-cinzel)] text-[10px] font-bold uppercase tracking-[0.28em] text-white sm:text-xs sm:tracking-[0.32em]"
              style={{
                textShadow:
                  '0 1px 8px color-mix(in srgb, var(--color-motif-deep) 80%, transparent), 0 0 20px color-mix(in srgb, black 30%, transparent)',
              }}
            >
              18th Birthday
            </span>
            <span className="h-px w-8 bg-motif-yellow/50 sm:w-12" />
          </div>

          <p
            className="text-center font-serif text-[clamp(1.75rem,6vw,2.75rem)] leading-none text-white"
            style={{
              textShadow:
                '0 2px 12px color-mix(in srgb, var(--color-motif-deep) 45%, transparent)',
            }}
          >
            {siteConfig.couple.debutName}
          </p>

          <div
            className="relative mt-5 mb-1 h-7 w-full max-w-md sm:h-8"
            aria-live="polite"
            aria-atomic="true"
          >
            <p
              className="absolute inset-x-0 top-0 text-center font-[family-name:var(--font-cinzel)] text-xs font-bold uppercase leading-snug tracking-[0.22em] text-white transition-all duration-[450ms] ease-out sm:text-sm sm:tracking-[0.28em]"
              style={{
                opacity: messageVisible ? 1 : 0,
                transform: messageVisible ? 'translateY(0)' : 'translateY(8px)',
                textShadow:
                  '0 1px 8px color-mix(in srgb, var(--color-motif-deep) 80%, transparent), 0 0 24px color-mix(in srgb, black 35%, transparent)',
              }}
            >
              {LOADING_MESSAGES[messageIndex]}
            </p>
          </div>

          <div className="mx-auto w-full max-w-xs">
            <div className="h-1 overflow-hidden rounded-full bg-white/25 ring-1 ring-white/30">
              <div
                className="relative h-full rounded-full bg-white transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  boxShadow: '0 0 12px color-mix(in srgb, white 65%, transparent)',
                }}
              />
            </div>
            <p className="mt-2 text-center font-sans text-[10px] tabular-nums tracking-widest text-white/70">
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
