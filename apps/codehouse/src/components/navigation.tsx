'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/components/shadcn/tooltip';
import { cn } from '@repo/ui/lib/utils';
import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
  usePresenceData,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useTranslations } from 'next-intl';
import { FaArrowUp } from 'react-icons/fa6';

import { useEffect, useRef, useState } from 'react';

import type { ReactNode } from 'react';
import type { LinkType } from '@/lib/nav-links';

import { Link } from '@/i18n/navigation';

type NavigationProps = {
  links: readonly LinkType[];
};

/**
 * Desktop remounts per link set, so every page change that swaps the links (forward or back in history) plays the
 * old set's exit and then the new set's entrance (`mode="wait"`). `custom` tells the leaving set whether the links
 * really changed (read with usePresenceData). The mobile bar just swaps.
 */
export function Navigation({ links }: NavigationProps) {
  const linkSet = linkSetOf(links);

  return (
    <>
      <AnimatePresence mode="wait" initial={false} custom={linkSet !== shownLinkSet}>
        <DesktopNavigation key={linkSet} links={links} />
      </AnimatePresence>
      <MobileNavigation links={links} />
    </>
  );
}

function useBackToTopMotion() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, 0]);
  const pointerEvents = useTransform(opacity, value => (value > 0.1 ? 'auto' : 'none'));

  return { opacity, pointerEvents, y };
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function BackToTopButton({ className }: { className?: string }) {
  const t = useTranslations('common');
  const { opacity, pointerEvents, y } = useBackToTopMotion();

  return (
    <motion.button
      type="button"
      aria-label={t('navigation_back-to-top')}
      onClick={scrollToTop}
      style={{ opacity, pointerEvents, y }}
      whileHover={{ scale: 1.05 }}
      className={cn('text-primary-foreground hover:text-accent', className)}>
      <FaArrowUp aria-hidden />
    </motion.button>
  );
}

function NavLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Names only from the xl breakpoint (1280px); below it the row is icons with tooltips. */
const LABELS_FROM = '(min-width: 80rem)';
/** Seconds per typed character, as in the named logo's slogan (the `type-on` utility). */
const TYPE_STEP = 0.045;
/**
 * When the icons pop in and the first name starts typing: on the page-load entrance (after the named logo), when a
 * page change swaps the links (straight away), and on a later reveal from resizing.
 */
const POP_START = 0.5;
const SWAP_POP_START = 0.1;
const TYPE_START = 0.7;
const SWAP_TYPE_START = 0.3;
const RETYPE_START = 0.1;

/**
 * The link set on screen, so a remount can tell a page change that swaps the links (quicker swap timings) from the
 * first mount (full entrance). Module state, reset by a real page load; a locale switch is one.
 */
let shownLinkSet: string | null = null;

function linkSetOf(links: readonly LinkType[]) {
  return links.map(link => link.href).join(' ');
}

/**
 * The exit runs the entrance backwards, but quicker: names un-type into their icons, last link first, then the icons
 * drop out together.
 */
const EXIT_TYPE_STEP = 0.01;
const EXIT_STAGGER = 0.05;
const EXIT_ICON_DURATION = 0.12;
/** Pause with only the icons left before they fade out. */
const EXIT_ICON_DELAY = 0.15;

/** Snap a 0→1 progress to whole characters, so a growing width reveals the name one letter at a time. */
function typedSteps(characters: number) {
  return (progress: number) => Math.min(1, Math.ceil(progress * characters) / characters);
}

/**
 * Header links as icons plus names.
 * - Names show from xl (1280px) up, and only while the fully labelled row (a hidden max-content copy, measured with
 *   a ResizeObserver so locale, font loading and resizes count) fits between the named logo and the controls.
 *   Otherwise the names collapse and each icon gets a tooltip.
 * - Every time the names appear — on load, and again whenever the window grows back past 1280px after they had
 *   collapsed — they type themselves in like the slogan, one after another. Each name's width grows with its
 *   typing (Motion `width: auto`, stepped per character), so the icons after it move along instead of jumping.
 *   Collapsing is instant.
 * - Every page change that swaps the links (home ↔ a service page, forward or back) plays the same entrance for the
 *   new set, after the old set leaves with the entrance reversed (see Navigation). A locale switch is a full page
 *   load, so it plays the full entrance like the rest of the header.
 * Every link is named by aria-label either way, so the label spans are hidden from assistive tech.
 */
function DesktopNavigation({ links }: NavigationProps) {
  const t = useTranslations('common');
  const reduceMotion = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [labelled, setLabelled] = useState(false);
  const linkSet = linkSetOf(links);
  const [isPresent, safeToRemove] = usePresence();
  const exitPlays = usePresenceData() === true;
  const [scope, animate] = useAnimate<HTMLElement>();
  // Decided on the first render so the icons start hidden; always false on the server and the first hydration.
  const [swapped] = useState(() => shownLinkSet !== null && shownLinkSet !== linkSet);
  const [typeStart, setTypeStart] = useState(TYPE_START);

  useEffect(() => {
    shownLinkSet = linkSet;
  }, [linkSet]);

  useEffect(() => {
    if (isPresent) return;
    if (!exitPlays || reduceMotion) {
      safeToRemove();
      return;
    }

    const labels = Array.from(scope.current.querySelectorAll<HTMLElement>('[data-nav-label]'));
    const icons = Array.from(scope.current.querySelectorAll<HTMLElement>('[data-nav-icon]'));
    void Promise.all(
      labels.map((label, index) => {
        const characters = label.textContent?.length || 1;
        return animate(
          label,
          { width: 0, marginLeft: 0 },
          {
            duration: characters * EXIT_TYPE_STEP,
            delay: (labels.length - 1 - index) * EXIT_STAGGER,
            ease: typedSteps(characters),
          },
        );
      }),
    )
      .then(() => animate(icons, { opacity: 0, y: 6 }, { duration: EXIT_ICON_DURATION, delay: EXIT_ICON_DELAY }))
      .then(safeToRemove);
  }, [isPresent, exitPlays, reduceMotion, safeToRemove, animate, scope]);

  useEffect(() => {
    const area = areaRef.current;
    const measure = measureRef.current;
    if (!area || !measure) return;

    const query = window.matchMedia(LABELS_FROM);
    let shown = false;
    let pageLoad = true;

    const update = () => {
      const fits = query.matches && measure.offsetWidth <= area.clientWidth;
      if (fits && !shown) {
        // A fresh reveal types in: with the entrance on mount, straight away after a resize.
        const entranceStart = swapped ? SWAP_TYPE_START : TYPE_START;
        setTypeStart(pageLoad ? entranceStart : RETYPE_START);
        pageLoad = false;
      }
      shown = fits;
      setLabelled(fits);
    };

    const observer = new ResizeObserver(update);
    observer.observe(area);
    observer.observe(measure);
    query.addEventListener('change', update);
    void document.fonts?.ready.then(update);
    // After the first measurement, later reveals count as resizes, not the page-load entrance.
    const settle = window.setTimeout(() => (pageLoad = false), 1000);

    return () => {
      observer.disconnect();
      query.removeEventListener('change', update);
      window.clearTimeout(settle);
    };
  }, [swapped]);

  const items = links.map(link => ({ ...link, label: t(link.t) }));
  let typedBefore = 0;

  return (
    <nav ref={scope} aria-label="Primary" className="relative z-50 hidden min-w-0 flex-1 lg:flex">
      <div ref={areaRef} className="flex min-w-0 flex-1 items-center justify-center">
        <TooltipProvider delay={150}>
          <div className="flex items-center gap-1 py-2">
            {items.map((link, index) => {
              const characters = link.label.length;
              const typing = labelled && !reduceMotion;
              const delay = typeStart + typedBefore * TYPE_STEP;
              typedBefore += characters;

              return (
                <Tooltip key={link.href} disabled={labelled}>
                  <TooltipTrigger
                    render={<Link href={link.href} aria-label={link.label} />}
                    className={cn(
                      'flex h-11 items-center rounded-lg px-2.5 text-2xl transition-colors',
                      // Pops in like the named logo's mark. The delay is inline: `delay-*` would also delay the hover color.
                      'fade-in zoom-in-85 animation-duration-500 ease-snap fill-mode-both motion-safe:animate-in',
                      'text-primary-foreground hover:text-accent hover:bg-white/10',
                      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none',
                    )}
                    style={{ animationDelay: `${(swapped ? SWAP_POP_START : POP_START) + index * 0.08}s` }}>
                    <span aria-hidden data-nav-icon>
                      {link.icon}
                    </span>
                    <motion.span
                      aria-hidden
                      data-nav-label
                      className="font-digital overflow-hidden text-xl whitespace-nowrap"
                      initial={false}
                      animate={labelled ? { width: 'auto', marginLeft: 8 } : { width: 0, marginLeft: 0 }}
                      transition={
                        typing
                          ? { duration: characters * TYPE_STEP, delay, ease: typedSteps(characters) }
                          : { duration: 0 }
                      }>
                      {link.label}
                    </motion.span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8} className="font-digital text-sm tracking-wide">
                    {link.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
            <BackToTopButton className="ml-1 rounded-md p-2 text-xl md:text-2xl" />
          </div>
        </TooltipProvider>
      </div>
      {/* The labelled row at its natural width, never shown: what has to fit for the names to appear. */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 flex w-max items-center gap-1 py-2 whitespace-nowrap">
        {items.map(link => (
          <span key={link.href} className="flex h-11 items-center gap-2 px-2.5 text-2xl">
            {link.icon}
            <span className="font-digital text-xl">{link.label}</span>
          </span>
        ))}
        <span className="ml-1 p-2 text-2xl">
          <FaArrowUp />
        </span>
      </div>
    </nav>
  );
}

function MobileNavigation({ links }: NavigationProps) {
  const t = useTranslations('common');

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'bg-primary text-primary-foreground fixed inset-x-0 bottom-0 z-40 flex h-14 w-full items-center text-2xl lg:hidden',
      )}>
      <div className="flex flex-1 items-center justify-evenly">
        {links.map(link => (
          <NavLink
            key={link.href}
            href={link.href}
            className={cn(
              'font-digital hover:text-accent flex flex-col items-center gap-1 leading-none transition-colors',
            )}>
            {link.icon}
            <span className="text-xs">{t(link.t)}</span>
          </NavLink>
        ))}
      </div>
      <BackToTopButton className="w-10 text-2xl" />
    </nav>
  );
}
