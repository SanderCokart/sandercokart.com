'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/components/shadcn/tooltip';
import { cn } from '@repo/ui/lib/utils';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FaArrowUp } from 'react-icons/fa6';

import { useEffect, useRef, useState } from 'react';

import type { CSSProperties, ReactNode } from 'react';
import type { LinkType } from '@/lib/nav-links';

import { Link } from '@/i18n/navigation';
import { hasPlayedIntro } from '@/lib/intro';

type NavigationProps = {
  links: readonly LinkType[];
};

export function Navigation({ links }: NavigationProps) {
  return (
    <>
      <DesktopNavigation links={links} />
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
/** Seconds per typed character, as in the named logo's slogan (`.type-on`). */
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

/** The link set on screen, so a remount can tell a page change that swapped the links from a locale switch. */
let shownLinkSet: string | null = null;

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
 * - A page change that swaps the links (home ↔ a service page; SiteNavigation remounts this per link set) plays the
 *   same entrance for the new links. A remount with the same links (locale switch) shows them directly.
 * Every link is named by aria-label either way, so the label spans are hidden from assistive tech.
 */
function DesktopNavigation({ links }: NavigationProps) {
  const t = useTranslations('common');
  const reduceMotion = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [labelled, setLabelled] = useState(false);
  const linkSet = links.map(link => link.href).join(' ');
  // Decided on the first render so the icons start hidden; always false on the server and the first hydration.
  const [swapped] = useState(() => hasPlayedIntro() && shownLinkSet !== null && shownLinkSet !== linkSet);
  const [reveal, setReveal] = useState({ typed: true, start: TYPE_START });

  useEffect(() => {
    shownLinkSet = linkSet;
  }, [linkSet]);

  useEffect(() => {
    const area = areaRef.current;
    const measure = measureRef.current;
    if (!area || !measure) return;

    const query = window.matchMedia(LABELS_FROM);
    let shown = false;
    let first = !hasPlayedIntro() || swapped;
    let pageLoad = true;

    const update = () => {
      const fits = query.matches && measure.offsetWidth <= area.clientWidth;
      if (fits && !shown) {
        // A fresh reveal: type in, unless this is a remounted header whose entrance already played.
        const entranceStart = swapped ? SWAP_TYPE_START : TYPE_START;
        setReveal({ typed: first || !pageLoad, start: pageLoad ? entranceStart : RETYPE_START });
        pageLoad = false;
      }
      if (!fits && shown) first = false;
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
    <nav
      aria-label="Primary"
      data-nav-swapped={swapped || undefined}
      className="relative z-50 hidden min-w-0 flex-1 lg:flex">
      <div ref={areaRef} className="flex min-w-0 flex-1 items-center justify-center">
        <TooltipProvider delay={150}>
          <div className="flex items-center gap-1 py-2">
            {items.map((link, index) => {
              const characters = link.label.length;
              const typing = labelled && reveal.typed && !reduceMotion;
              const delay = reveal.start + typedBefore * TYPE_STEP;
              typedBefore += characters;

              return (
                <Tooltip key={link.href} disabled={labelled}>
                  <TooltipTrigger
                    render={<Link href={link.href} aria-label={link.label} />}
                    className={cn(
                      'pop-in flex h-11 items-center rounded-lg px-2.5 text-2xl transition-colors',
                      'text-primary-foreground hover:text-accent hover:bg-white/10',
                      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none',
                    )}
                    style={
                      { '--pop-delay': `${(swapped ? SWAP_POP_START : POP_START) + index * 0.08}s` } as CSSProperties
                    }>
                    <span aria-hidden>{link.icon}</span>
                    <motion.span
                      aria-hidden
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
