'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useSiteConfig } from '@/hooks/use-site-config';
import { parseWeddingDate } from '@/lib/wedding-date';
import Image from 'next/image';
import { InviteParticles } from '@/components/loader/InviteParticles';
import './loading-screen.css';

interface LoadingScreenProps {
  onComplete: () => void;
  onFadeStart?: () => void;
}

const MESSAGE_HOLD_MS = 3000;
const FADE_OUT_MS = 950;

const LOADING_MESSAGES = [
  'Preparing your invitation',
  'Gathering your memories',
  'Sealing with care',
  'Your invitation awaits',
] as const;

const TOTAL_DURATION_MS = LOADING_MESSAGES.length * MESSAGE_HOLD_MS;

const entryEase = [0.22, 1, 0.36, 1] as const;
const rollerEase = [0.16, 1, 0.3, 1] as const;
const ROLLER_TRANSITION_MS = 680;
const STATUS_LINE_HEIGHT_REM = 2.85;
const COUPLE_NAME_IMAGE = '/decoration/couple (1).png';
const COUPLE_NAME_ASPECT = 1417 / 242;

const CORNER_DECO_CLASS =
  'block h-auto w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[180px] opacity-75';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onFadeStart }) => {
  const siteConfig = useSiteConfig();
  const reduceMotion = useReducedMotion();
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;

  const weddingDateGhost = useMemo(() => {
    const parsed = parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date);
    const wedding = new Date(`${parsed.month} ${parsed.day}, ${parsed.year}`);
    if (Number.isNaN(wedding.getTime())) {
      const monthDate = new Date(`${parsed.month} 1, ${parsed.year}`);
      const month = Number.isNaN(monthDate.getTime())
        ? '00'
        : String(monthDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsed.day).padStart(2, '0');
      const year = String(parsed.year).slice(-2);
      return { month, day, year };
    }
    return {
      month: String(wedding.getMonth() + 1).padStart(2, '0'),
      day: String(wedding.getDate()).padStart(2, '0'),
      year: String(wedding.getFullYear()).slice(-2),
    };
  }, [siteConfig.ceremony.date, siteConfig.wedding.date]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 40);

    const messageInterval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, MESSAGE_HOLD_MS);

    const completeTimer = setTimeout(() => {
      setProgress(100);
      onFadeStart?.();
      setFadeOut(true);
      setTimeout(onComplete, FADE_OUT_MS);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete, onFadeStart]);

  return (
    <motion.div
      className="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden overscroll-none h-dvh max-h-dvh"
      aria-live="polite"
      aria-busy={!fadeOut}
      aria-label="Loading invitation"
      initial={false}
      animate={
        fadeOut
          ? {
              opacity: 0,
              scale: reduceMotion ? 1 : 1.035,
              filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
            }
          : {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            }
      }
      transition={{
        duration: reduceMotion ? 0.2 : FADE_OUT_MS / 1000,
        ease: entryEase,
      }}
      style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      {!reduceMotion && (
        <div className="loading-screen__particles absolute inset-0 pointer-events-none">
          <InviteParticles count={28} />
        </div>
      )}

      <div className="loading-screen__glow absolute inset-0 pointer-events-none" />

      <div className="loading-screen__corner loading-screen__corner--tl pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/left-top-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>
      <div className="loading-screen__corner loading-screen__corner--tr pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/right-top-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>
      <div className="loading-screen__corner loading-screen__corner--bl pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/left-bottom-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>
      <div className="loading-screen__corner loading-screen__corner--br pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/right-bottom-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>

      <div className="loading-screen__ghost-date pointer-events-none select-none" aria-hidden="true">
        <span className="loading-screen__ghost-date-part">{weddingDateGhost.month}</span>
        <span className="loading-screen__ghost-date-sep" aria-hidden="true" />
        <span className="loading-screen__ghost-date-part">{weddingDateGhost.day}</span>
        <span className="loading-screen__ghost-date-sep" aria-hidden="true" />
        <span className="loading-screen__ghost-date-part">{weddingDateGhost.year}</span>
      </div>

      <motion.div
        className="loading-screen__content relative px-6 text-center"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: entryEase, delay: reduceMotion ? 0 : 0.12 }}
      >
        <div className="loading-screen__monogram-slot">
          <Image
            src={siteConfig.couple.monogram}
            alt=""
            fill
            className="object-contain loading-screen__monogram"
            priority
          />
        </div>

        <div
          className="loading-screen__status-slot"
          aria-live="polite"
          aria-atomic="true"
        >
          <motion.div
            className="loading-screen__status-roller"
            animate={{ y: `-${messageIndex * STATUS_LINE_HEIGHT_REM}rem` }}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : { duration: ROLLER_TRANSITION_MS / 1000, ease: rollerEase }
            }
          >
            {LOADING_MESSAGES.map((message) => (
              <p key={message} className="loading-screen__status-line">
                {message}
              </p>
            ))}
          </motion.div>
        </div>

        <div
          className="loading-screen__names-slot"
          style={{ aspectRatio: COUPLE_NAME_ASPECT }}
        >
          <Image
            src={COUPLE_NAME_IMAGE}
            alt={coupleNames}
            fill
            className="loading-screen__names-image object-contain object-center"
            sizes="(max-width: 640px) 92vw, 22rem"
            priority
          />
        </div>

        <div className="loading-screen__track-slot">
          <div className="loading-screen__track">
            <div
              className="loading-screen__bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
