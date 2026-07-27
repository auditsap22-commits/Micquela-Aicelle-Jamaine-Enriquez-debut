'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from 'motion/react';
import { useSiteConfig } from '@/hooks/use-site-config';
import { parseWeddingDate } from '@/lib/wedding-date';
import { InviteParticles } from '@/components/loader/InviteParticles';
import './envelope-invite.css';

interface HeroProps {
  onOpen: () => void;
  onTransitionStart?: () => void;
  visible: boolean;
  enterFromLoading?: boolean;
}

const POLAROID_PHOTOS = [
  { src: '/envelope/back.png', side: 'left' as const },
  { src: '/envelope/front.png', side: 'center' as const },
  { src: '/envelope/back2.png', side: 'right' as const },
];

const COUPLE_NAME_IMAGE = '/decoration/couple (2).png';

const CORNER_DECO_CLASS =
  'block h-auto w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[180px] opacity-75';

const photoInteractEase: Transition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] };
const focusLiftEase: Transition = { duration: 1.15, ease: [0.22, 1, 0.36, 1] };
const revealEntryEase: Transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
const buttonEntryEase: Transition = { duration: 0.95, ease: [0.16, 1, 0.3, 1] };

type PhotoSide = 'left' | 'center' | 'right';

type EnvelopePhase =
  | 'idle'
  | 'seal-press'
  | 'seal-break'
  | 'flap-open'
  | 'rising'
  | 'photos'
  | 'revealed'
  | 'cta';

function getFocusLiftPhase(phase: EnvelopePhase): 'idle' | 'opening' | 'photos' | 'revealed' | 'cta' {
  if (phase === 'idle') return 'idle';
  if (
    phase === 'seal-press' ||
    phase === 'seal-break' ||
    phase === 'flap-open' ||
    phase === 'rising'
  ) {
    return 'opening';
  }
  if (phase === 'photos') return 'photos';
  if (phase === 'revealed') return 'revealed';
  return 'cta';
}

const photoEmergenceEase: Transition = { duration: 3.2, ease: [0.08, 1, 0.2, 1] };
const letterEmergenceEase: Transition = { duration: 2.85, ease: [0.08, 1, 0.2, 1] };
const flapEase: Transition = { duration: 1.1, ease: [0.65, 0, 0.35, 1] };
const envelopeEase: Transition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] };
const inviteExitEase: Transition = { duration: 1.75, ease: [0.22, 1, 0.36, 1] };
const inviteEnterEase: Transition = { duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.06 };
const letterExitEase: Transition = { duration: 1.35, ease: [0.16, 1, 0.3, 1] };
const INVITE_EXIT_MS = 1850;

export const Hero: React.FC<HeroProps> = ({
  onOpen,
  onTransitionStart,
  visible,
  enterFromLoading = false,
}) => {
  const siteConfig = useSiteConfig();
  const reduceMotion = useReducedMotion();
  const openedRef = useRef(false);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<EnvelopePhase>('idle');
  const [liveMessage, setLiveMessage] = useState('');
  const [liftedPhoto, setLiftedPhoto] = useState<PhotoSide | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;

  const letterDateNumeric = useMemo(() => {
    const parsed = parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date);
    const wedding = new Date(`${parsed.month} ${parsed.day}, ${parsed.year}`);
    if (Number.isNaN(wedding.getTime())) {
      const monthDate = new Date(`${parsed.month} 1, ${parsed.year}`);
      const month = Number.isNaN(monthDate.getTime())
        ? '00'
        : String(monthDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsed.day).padStart(2, '0');
      const year = String(parsed.year).slice(-2);
      return `${month} | ${day} | ${year}`;
    }
    const month = String(wedding.getMonth() + 1).padStart(2, '0');
    const day = String(wedding.getDate()).padStart(2, '0');
    const year = String(wedding.getFullYear()).slice(-2);
    return `${month} | ${day} | ${year}`;
  }, [siteConfig.ceremony.date, siteConfig.wedding.date]);

  const weddingDateGhost = useMemo(() => {
    const [month, day, year] = letterDateNumeric.split(' | ');
    return { month, day, year };
  }, [letterDateNumeric]);

  const daysToGo = useMemo(() => {
    const parsed = parseWeddingDate(siteConfig.wedding.date);
    const wedding = new Date(`${parsed.month} ${parsed.day}, ${parsed.year}`);
    if (Number.isNaN(wedding.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    wedding.setHours(0, 0, 0, 0);

    const diff = Math.ceil((wedding.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }, [siteConfig.wedding.date]);

  const daysToGoLabel =
    daysToGo === null
      ? null
      : daysToGo === 1
        ? '1 day to go'
        : `${daysToGo} days to go`;

  const flapIsOpen =
    phase === 'flap-open' ||
    phase === 'rising' ||
    phase === 'photos' ||
    phase === 'revealed' ||
    phase === 'cta';

  const contentsVisible =
    phase === 'rising' ||
    phase === 'photos' ||
    phase === 'revealed' ||
    phase === 'cta';

  const sealGone =
    phase === 'seal-break' ||
    phase === 'flap-open' ||
    phase === 'rising' ||
    phase === 'photos' ||
    phase === 'revealed' ||
    phase === 'cta';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      openedRef.current = false;
      setPhase('idle');
      setLiveMessage('');
      setLiftedPhoto(null);
      setIsExiting(false);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || isExiting) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [visible, isExiting]);

  useEffect(() => {
    if (phase === 'cta') {
      enterBtnRef.current?.focus({ preventScroll: true });
    }
  }, [phase]);

  useEffect(() => {
    if (
      phase === 'idle' ||
      phase === 'seal-press' ||
      phase === 'seal-break' ||
      phase === 'flap-open' ||
      phase === 'rising'
    ) {
      setLiftedPhoto(null);
    }
  }, [phase]);

  const toggleLiftedPhoto = useCallback((side: PhotoSide) => {
    setLiftedPhoto((current) => (current === side ? null : side));
  }, []);

  const handleEnterInvitation = useCallback(async () => {
    if (isExiting || phase !== 'cta') return;

    setIsExiting(true);
    setLiveMessage('Opening your invitation.');
    onTransitionStart?.();

    if (reduceMotion) {
      onOpen();
      return;
    }

    await wait(INVITE_EXIT_MS);
    onOpen();
  }, [isExiting, onOpen, onTransitionStart, phase, reduceMotion]);

  const runOpenSequence = useCallback(async () => {
    if (reduceMotion) {
      setPhase('cta');
      setLiveMessage('Invitation opened.');
      return;
    }

    setLiveMessage('Pressing seal.');
    setPhase('seal-press');
    await wait(160);

    setLiveMessage('Breaking seal.');
    setPhase('seal-break');
    await wait(280);

    setLiveMessage('Opening envelope.');
    setPhase('flap-open');
    await wait(1100);

    setLiveMessage('Invitation rising.');
    setPhase('rising');
    await wait(3000);

    setLiveMessage('Photos revealing.');
    setPhase('photos');
    await wait(3600);

    setPhase('revealed');
    await wait(650);

    setPhase('cta');
    setLiveMessage('Invitation ready.');
  }, [reduceMotion]);

  const handleSealClick = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      if (openedRef.current || phase !== 'idle') return;
      openedRef.current = true;
      void runOpenSequence();
    },
    [phase, runOpenSequence]
  );

  /* Keep envelope tilt on Y only — parent rotateX breaks the flap hinge in 3D */
  const envelopeVariants: Variants = {
    idle: { rotateX: 0, rotateY: -2, scale: 1, y: 0 },
    press: { rotateX: 0, rotateY: -2, scale: 0.988, y: 1 },
    opening: { rotateX: 0, rotateY: 0, scale: 1.012, y: 3 },
    open: { rotateX: 0, rotateY: 0, scale: 1, y: 6 },
  };

  /* Match reference sample: single flap, rotateX(180deg) positive, origin top center */
  const flapVariants: Variants = {
    closed: { rotateX: 0 },
    open: { rotateX: 180 },
  };

  const sealVariants: Variants = {
    idle: { scale: 1, opacity: 1, rotate: 0, y: 0 },
    press: { scale: 0.92, opacity: 1, rotate: 0, y: 2 },
    break: { scale: 0.12, opacity: 0, rotate: 28, y: -6 },
  };

  /*
    Letter emerges like the polaroids — anchored at the pocket floor,
    slides upward through the lip. Positive y = inside; negative y = above pocket.
  */
  const letterVariants: Variants = {
    hidden: { y: '6%', scale: 0.86, opacity: 1, rotate: -0.5 },
    rising: { y: '-88%', scale: 1, opacity: 1, rotate: 0 },
    out: { y: '-88%', scale: 1, opacity: 1, rotate: 0 },
    exitPortal: {
      y: '-122%',
      scale: 2.75,
      opacity: 1,
      rotate: 0,
      zIndex: 48,
    },
  };

  /*
    Photos stay anchored at the card bottom (y ≥ 0) so nothing slips below the edge.
    They rise upward and fan out from behind the letter.
  */
  const photoLeftVariants: Variants = {
    hidden: { y: '7%', x: '2%', rotate: -2, scale: 0.86, opacity: 0, zIndex: 18 },
    emerge: { y: '-50%', x: '-8%', rotate: -6, scale: 1, opacity: 1, zIndex: 18 },
    hover: { y: '-56%', x: '-8%', rotate: -7, scale: 1.04, opacity: 1, zIndex: 24 },
    press: { y: '-53%', x: '-8%', rotate: -6.5, scale: 1.02, opacity: 1, zIndex: 22 },
    lifted: { y: '-64%', x: '-8%', rotate: -7, scale: 1.06, opacity: 1, zIndex: 28 },
    exit: { y: '-18%', x: '-108%', rotate: -24, scale: 0.68, opacity: 0, zIndex: 10 },
  };

  const photoCenterVariants: Variants = {
    hidden: { y: '6%', x: '0%', rotate: 0, scale: 0.84, opacity: 0, zIndex: 18 },
    emerge: { y: '-46%', x: '0%', rotate: 1, scale: 1, opacity: 1, zIndex: 19 },
    hover: { y: '-52%', x: '0%', rotate: 1.5, scale: 1.04, opacity: 1, zIndex: 25 },
    press: { y: '-49%', x: '0%', rotate: 1.2, scale: 1.02, opacity: 1, zIndex: 23 },
    lifted: { y: '-60%', x: '0%', rotate: 2, scale: 1.06, opacity: 1, zIndex: 29 },
    exit: { y: '-108%', x: '0%', rotate: 10, scale: 0.72, opacity: 0, zIndex: 10 },
  };

  const photoRightVariants: Variants = {
    hidden: { y: '7%', x: '-2%', rotate: 2, scale: 0.86, opacity: 0, zIndex: 18 },
    emerge: { y: '-50%', x: '8%', rotate: 6, scale: 1, opacity: 1, zIndex: 18 },
    hover: { y: '-56%', x: '8%', rotate: 7, scale: 1.04, opacity: 1, zIndex: 24 },
    press: { y: '-53%', x: '8%', rotate: 6.5, scale: 1.02, opacity: 1, zIndex: 22 },
    lifted: { y: '-64%', x: '8%', rotate: 7, scale: 1.06, opacity: 1, zIndex: 28 },
    exit: { y: '-18%', x: '108%', rotate: 24, scale: 0.68, opacity: 0, zIndex: 10 },
  };

  const revealCopyContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.16, delayChildren: 0.1 },
    },
    exit: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const revealCopyItemVariants: Variants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: revealEntryEase,
    },
    exit: {
      opacity: 0,
      y: 28,
      filter: 'blur(6px)',
      transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
    },
  };

  const buttonRevealVariants: Variants = {
    hidden: { opacity: 0, y: 28, x: '-50%', scale: 0.92, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      x: '-50%',
      scale: 1,
      filter: 'blur(0px)',
      transition: buttonEntryEase,
    },
    exit: {
      opacity: 0,
      y: 36,
      x: '-50%',
      scale: 0.9,
      filter: 'blur(6px)',
      transition: { duration: 0.36, ease: [0.4, 0, 1, 1] },
    },
  };

  const focusLiftVariants: Variants = {
    idle: { y: 'clamp(3.75rem, 9dvh, 5.25rem)' },
    opening: { y: 'clamp(2.85rem, 6.5dvh, 4rem)' },
    photos: { y: 'clamp(2.85rem, 6.5dvh, 4rem)' },
    revealed: { y: 'clamp(1.65rem, 4dvh, 2.5rem)' },
    cta: { y: 'clamp(1.1rem, 2.75dvh, 1.75rem)' },
  };

  const daysToGoVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { ...revealEntryEase, delay: 0.05 },
    },
    exit: { opacity: 0, y: -12, scale: 0.94, filter: 'blur(4px)' },
  };

  if (!mounted) return null;

  const letterState =
    phase === 'idle' ||
    phase === 'seal-press' ||
    phase === 'seal-break' ||
    phase === 'flap-open'
      ? 'hidden'
      : phase === 'rising'
        ? 'rising'
        : 'out';

  const photoState =
    phase === 'idle' ||
    phase === 'seal-press' ||
    phase === 'seal-break' ||
    phase === 'flap-open' ||
    phase === 'rising'
      ? 'hidden'
      : 'emerge';

  const photosInteractive = photoState === 'emerge';

  const envelopeState =
    phase === 'idle'
      ? 'idle'
      : phase === 'seal-press' || phase === 'seal-break' || phase === 'flap-open'
        ? 'press'
        : phase === 'rising'
          ? 'opening'
          : 'open';

  const sealState =
    phase === 'idle' ? 'idle' : phase === 'seal-press' ? 'press' : 'break';

  return (
    <motion.div
      className={`env-invite-screen ${visible ? '' : 'is-hidden'}`}
      data-phase={isExiting ? 'exiting' : phase}
      aria-hidden={!visible}
      initial={
        enterFromLoading && !reduceMotion
          ? { opacity: 0, scale: 1.04, y: 12, filter: 'blur(10px)' }
          : false
      }
      animate={
        isExiting
          ? {
              opacity: 0,
              scale: 1.08,
              y: '-4%',
              filter: 'blur(16px)',
            }
          : {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
            }
      }
      transition={
        isExiting ? inviteExitEase : enterFromLoading ? inviteEnterEase : { duration: 0.01 }
      }
      style={{
        pointerEvents: isExiting ? 'none' : undefined,
        transformOrigin: '50% 38%',
      }}
    >
      {!reduceMotion && (
        <div className="env-invite-particles pointer-events-none" aria-hidden="true">
          <InviteParticles count={28} />
        </div>
      )}

      <div className="env-invite-bg-glow pointer-events-none" aria-hidden="true" />

      <div className="env-invite-corner env-invite-corner--tl pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/left-top-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>
      <div className="env-invite-corner env-invite-corner--tr pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/right-top-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>
      <div className="env-invite-corner env-invite-corner--bl pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/left-bottom-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>
      <div className="env-invite-corner env-invite-corner--br pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/right-bottom-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>

      <div className="env-invite-ghost-date pointer-events-none select-none" aria-hidden="true">
        <span className="env-invite-ghost-date-part">{weddingDateGhost.month}</span>
        <span className="env-invite-ghost-date-sep" aria-hidden="true" />
        <span className="env-invite-ghost-date-part">{weddingDateGhost.day}</span>
        <span className="env-invite-ghost-date-sep" aria-hidden="true" />
        <span className="env-invite-ghost-date-part">{weddingDateGhost.year}</span>
      </div>

      {isExiting && !reduceMotion && (
        <>
          <motion.div
            className="env-invite-exit-ring"
            aria-hidden="true"
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: 3.2, opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1], times: [0, 0.32, 1] }}
          />
          <motion.div
            className="env-invite-exit-bloom"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.35 }}
            animate={{ opacity: [0, 0.92, 0.65, 0], scale: [0.35, 1.15, 1.45, 1.65] }}
            transition={{
              duration: 1.55,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.28, 0.62, 1],
              delay: 0.08,
            }}
          />
          <motion.div
            className="env-invite-exit-shimmer"
            aria-hidden="true"
            initial={{ x: '-130%', opacity: 0 }}
            animate={{ x: '130%', opacity: [0, 0.75, 0] }}
            transition={{ duration: 1.15, ease: 'easeInOut', delay: 0.18 }}
          />
          <motion.div
            className="env-invite-exit-curtain env-invite-exit-curtain--left"
            aria-hidden="true"
            initial={{ x: '-105%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="env-invite-exit-curtain env-invite-exit-curtain--right"
            aria-hidden="true"
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.65, 0, 0.35, 1] }}
          />
        </>
      )}

      <p className="env-invite-live" aria-live="polite">
        {liveMessage}
      </p>

      <div className="env-invite-stage">
        <div className="env-invite-cluster">
          <motion.div
            className="env-invite-focus"
            variants={focusLiftVariants}
            initial="idle"
            animate={getFocusLiftPhase(phase)}
            transition={reduceMotion ? { duration: 0.01 } : focusLiftEase}
          >
          <motion.div
            className="env-invite-scene"
            animate={
              isExiting
                ? { opacity: 0, scale: 0.9, filter: 'blur(10px)' }
                : { opacity: 1, scale: 1, filter: 'blur(0px)' }
            }
            transition={
              isExiting
                ? { duration: 1.05, delay: 0.62, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0.01 }
            }
          >
          <div className="env-invite-ground-shadow" aria-hidden="true" />
          <div className="env-invite-ground-contact" aria-hidden="true" />

          <div className="env-invite-envelope">
            {/* Flap behind body when open — rendered first in paint order */}
            <div className="env-invite-flap-shadow" aria-hidden="true" />
            <motion.div
              className="env-invite-flap"
              variants={flapVariants}
              initial="closed"
              animate={flapIsOpen ? 'open' : 'closed'}
              transition={flapEase}
              style={{ transformOrigin: 'top center' }}
              aria-hidden="true"
            />

            <motion.div
              className="env-invite-envelope-body"
              variants={envelopeVariants}
              initial="idle"
              animate={envelopeState}
              transition={envelopeEase}
            >
              {/* Back panel */}
              <div className="env-invite-back" aria-hidden="true" />

              {/* Interior shadow — only visible once contents rise */}
              <div className="env-invite-interior" aria-hidden="true" />

              {/* Contents — clipped inside pocket */}
              <div className="env-invite-contents-clip" aria-hidden={!contentsVisible}>
              <div className="env-invite-contents">
                <div className="env-invite-emerge-stack">
                  <motion.div
                    className="env-invite-letter"
                    variants={letterVariants}
                    initial="hidden"
                    animate={isExiting ? 'exitPortal' : letterState}
                    transition={
                      isExiting
                        ? { ...letterExitEase, delay: 0.06 }
                        : letterState === 'rising'
                          ? {
                              ...letterEmergenceEase,
                              opacity: { duration: 0 },
                            }
                          : { duration: 0.01 }
                    }
                  >
                    <div className="env-invite-letter-frame" aria-hidden="true" />
                    <div className="env-invite-letter-inner">
                      <span className="env-invite-letter-label">Save the Date</span>
                      <span className="env-invite-letter-date">{letterDateNumeric}</span>
                      <span className="env-invite-letter-invited">You are Invited</span>
                      <div className="env-invite-letter-names">
                        <Image
                          src={COUPLE_NAME_IMAGE}
                          alt={coupleNames}
                          fill
                          className="env-invite-letter-names-image object-contain object-center"
                          sizes="220px"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <div className="env-invite-photos-emerge">
                    <PolaroidPhoto
                      side="left"
                      src={POLAROID_PHOTOS[0].src}
                      alt={coupleNames}
                      variants={photoLeftVariants}
                      photoState={photoState}
                      liftedPhoto={liftedPhoto}
                      onToggle={toggleLiftedPhoto}
                      interactive={photosInteractive}
                      emergenceDelay={0.55}
                      reduceMotion={reduceMotion}
                      isExiting={isExiting}
                    />
                    <PolaroidPhoto
                      side="center"
                      src={POLAROID_PHOTOS[1].src}
                      alt={coupleNames}
                      variants={photoCenterVariants}
                      photoState={photoState}
                      liftedPhoto={liftedPhoto}
                      onToggle={toggleLiftedPhoto}
                      interactive={photosInteractive}
                      emergenceDelay={1.0}
                      reduceMotion={reduceMotion}
                      isExiting={isExiting}
                    />
                    <PolaroidPhoto
                      side="right"
                      src={POLAROID_PHOTOS[2].src}
                      alt={coupleNames}
                      variants={photoRightVariants}
                      photoState={photoState}
                      liftedPhoto={liftedPhoto}
                      onToggle={toggleLiftedPhoto}
                      interactive={photosInteractive}
                      emergenceDelay={1.45}
                      reduceMotion={reduceMotion}
                      isExiting={isExiting}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Closed front skin — solid cover, hides when open */}
            <div className="env-invite-front-closed" aria-hidden="true">
              <div className="env-invite-fold env-invite-fold--tl" />
              <div className="env-invite-fold env-invite-fold--bl" />
              <div className="env-invite-fold env-invite-fold--br" />
              <div className="env-invite-fold env-invite-fold--b" />
              <svg
                className="env-invite-creases"
                viewBox="0 0 460 297"
                preserveAspectRatio="none"
              >
                <line x1="0" y1="0" x2="230" y2="172" />
                <line x1="460" y1="0" x2="230" y2="172" />
                <line x1="0" y1="297" x2="230" y2="172" />
                <line x1="460" y1="297" x2="230" y2="172" />
              </svg>
            </div>

            {/* Front pocket — solid panel + side folds, ALWAYS above contents */}
            <div className="env-invite-pocket" aria-hidden="true">
              <div className="env-invite-pocket-front" />
              <div className="env-invite-pocket-left" />
              <div className="env-invite-pocket-right" />
            </div>

            <div className="env-invite-hinge" aria-hidden="true" />
            </motion.div>

            {/* Wax seal — centered on flap junction */}
            <div
              className="env-invite-seal-wrap"
              style={{
                display: sealGone && phase !== 'seal-break' ? 'none' : undefined,
              }}
            >
              <motion.button
                type="button"
                className="env-invite-seal-btn"
                variants={sealVariants}
                initial="idle"
                animate={sealState}
                transition={
                  sealState === 'break'
                    ? { duration: 0.28, ease: 'easeIn' }
                    : { duration: 0.15, ease: 'easeOut' }
                }
                onClick={handleSealClick}
                disabled={phase !== 'idle'}
                aria-label="Break the wax seal to open the invitation"
              >
                <span className="env-invite-seal-wax-ring" aria-hidden="true" />
                <span className="env-invite-seal-emboss" aria-hidden="true" />
                <span className="env-invite-seal-monogram">
                  <Image
                    src={siteConfig.couple.monogram}
                    alt=""
                    fill
                    className="object-contain env-invite-seal-monogram-img"
                    sizes="72px"
                    priority
                  />
                </span>
              </motion.button>
            </div>

            {phase === 'seal-break' && !reduceMotion && (
              <>
                <motion.span
                  className="env-invite-seal-shard"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: -32, y: -36, opacity: 0, scale: 0.35 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  aria-hidden="true"
                />
                <motion.span
                  className="env-invite-seal-shard"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: 34, y: 22, opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.42, ease: 'easeOut' }}
                  aria-hidden="true"
                />
                <motion.span
                  className="env-invite-seal-shard"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: 18, y: -28, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.36, ease: 'easeOut' }}
                  aria-hidden="true"
                />
              </>
            )}
          </div>
        </motion.div>

          {daysToGoLabel && (
            <motion.p
              className="env-invite-days-to-go"
              variants={daysToGoVariants}
              initial="hidden"
              animate={
                isExiting
                  ? 'exit'
                  : phase === 'revealed' || phase === 'cta'
                    ? 'visible'
                    : 'hidden'
              }
              transition={
                isExiting
                  ? { duration: 0.42, ease: [0.4, 0, 1, 1] }
                  : reduceMotion
                    ? { duration: 0.01 }
                    : { ...revealEntryEase, delay: 0.05 }
              }
            >
              {daysToGoLabel}
            </motion.p>
          )}

          </motion.div>

          <p className="env-invite-hint">
            Tap the Seal to Open
          </p>
        </div>
      </div>

      <motion.div
        className="env-invite-reveal-copy"
        variants={revealCopyContainerVariants}
        initial="hidden"
        animate={
          isExiting
            ? 'exit'
            : phase === 'revealed' || phase === 'cta'
              ? 'visible'
              : 'hidden'
        }
      >
        <motion.h2 variants={revealCopyItemVariants}>
          We look forward to celebrate with you!
        </motion.h2>
        <motion.span className="script" variants={revealCopyItemVariants}>
          With love, {coupleNames}
        </motion.span>
      </motion.div>

      <motion.button
        ref={enterBtnRef}
        type="button"
        className="env-invite-enter-btn"
        variants={buttonRevealVariants}
        initial="hidden"
        animate={
          isExiting
            ? 'exit'
            : phase === 'cta'
              ? 'visible'
              : 'hidden'
        }
        whileHover={
          phase === 'cta' && !isExiting && !reduceMotion
            ? { y: -2, x: '-50%', scale: 1.02 }
            : undefined
        }
        whileTap={
          phase === 'cta' && !isExiting && !reduceMotion
            ? { y: 0, x: '-50%', scale: 0.98 }
            : undefined
        }
        onClick={handleEnterInvitation}
        disabled={phase !== 'cta' || isExiting}
      >
        View the Invitation
      </motion.button>
    </motion.div>
  );
};

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

interface PolaroidPhotoProps {
  side: PhotoSide;
  src: string;
  alt: string;
  variants: Variants;
  photoState: 'hidden' | 'emerge';
  liftedPhoto: PhotoSide | null;
  onToggle: (side: PhotoSide) => void;
  interactive: boolean;
  emergenceDelay: number;
  reduceMotion: boolean | null;
  isExiting?: boolean;
}

function PolaroidPhoto({
  side,
  src,
  alt,
  variants,
  photoState,
  liftedPhoto,
  onToggle,
  interactive,
  emergenceDelay,
  reduceMotion,
  isExiting = false,
}: PolaroidPhotoProps) {
  const canInteract = interactive && !reduceMotion && !isExiting;

  const animateState = isExiting
    ? 'exit'
    : photoState === 'hidden'
      ? 'hidden'
      : liftedPhoto === side
        ? 'lifted'
        : 'emerge';

  return (
    <motion.button
      type="button"
      className={`env-invite-polaroid env-invite-polaroid--${side}${liftedPhoto === side ? ' is-lifted' : ''}`}
      variants={variants}
      initial="hidden"
      animate={animateState}
      whileHover={canInteract && liftedPhoto !== side ? 'hover' : undefined}
      whileTap={canInteract ? 'press' : undefined}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : isExiting
            ? { duration: 0.85, ease: [0.4, 0, 0.2, 1], delay: 0.12 }
            : photoState === 'hidden'
              ? { duration: 0.01 }
              : animateState === 'emerge' && liftedPhoto === null
                ? { ...photoEmergenceEase, delay: emergenceDelay }
                : photoInteractEase
      }
      onClick={(e) => {
        e.stopPropagation();
        if (interactive) onToggle(side);
      }}
      disabled={!interactive}
      aria-label={`View photo ${side}`}
      aria-pressed={liftedPhoto === side}
    >
      <div className="env-invite-polaroid-photo">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover env-invite-polaroid-img"
          sizes="112px"
          priority
        />
      </div>
    </motion.button>
  );
}
