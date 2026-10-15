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
import { hasSeenIntro } from '@/lib/intro';

type NavigationProps = {
  links: readonly LinkType[];
  /**
   * How desktop shows the links: `labels` types each name in; `adaptive` shows icon and name while they fit beside
   * the named logo and drops to icons with tooltips when they do not.
   */
  variant?: 'labels' | 'adaptive';
};

export function Navigation({ links, variant = 'labels' }: NavigationProps) {
  return (
    <>
      {variant === 'adaptive' ? <DesktopAdaptiveNavigation links={links} /> : <DesktopNavigation links={links} />}
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

function DesktopNavigation({ links }: NavigationProps) {
  const t = useTranslations('common');

  return (
    <nav aria-label="Primary" className={cn('relative z-50 mx-auto hidden w-full max-w-4xl lg:block')}>
      <div className="flex items-center gap-6 py-2 md:gap-8">
        <div className="flex flex-1 place-items-center items-center justify-center gap-8">
          {links.map((link, index) => {
            const label = t(link.t);

            return (
              <NavLink
                key={link.href}
                href={link.href}
                className={cn(
                  'group',
                  'font-digital flex items-center justify-center gap-2 rounded-md px-2 py-1',
                  'text-primary-foreground hover:text-accent',
                  'text-xs md:text-2xl',
                )}>
                {/* Typed in after the named logo, one link after another (`.type-on`, ui themes/default.css). */}
                <span
                  className="type-on inline-block origin-center transition-transform duration-150 group-hover:scale-105"
                  style={{ '--chars': label.length, '--type-delay': `${0.5 + index * 0.15}s` } as CSSProperties}>
                  {label}
                </span>
              </NavLink>
            );
          })}
        </div>
        <BackToTopButton className="rounded-md p-2 text-xl md:text-2xl" />
      </div>
    </nav>
  );
}

/** Names only from the xl breakpoint (1280px); below it the row is icons with tooltips. */
const LABELS_FROM = '(min-width: 80rem)';
/** Seconds per typed character, as in the named logo's slogan (`.type-on`). */
const TYPE_STEP = 0.045;
/** When the first name starts typing on the entrance (after the icons have popped in). */
const TYPE_START = 0.7;

/** Snap a 0→1 progress to whole characters, so a growing width reveals the name one letter at a time. */
function typedSteps(characters: number) {
  return (progress: number) => Math.min(1, Math.ceil(progress * characters) / characters);
}

/**
 * Header links as icons plus names.
 * - Names show from xl (1280px) up, and only while the fully labelled row (a hidden max-content copy, measured with
 *   a ResizeObserver so locale, font loading and resizes count) fits between the named logo and the controls.
 *   Otherwise the names collapse and each icon gets a tooltip.
 * - On the entrance the names type themselves in like the slogan, one after another. Each name's width grows with
 *   its typing (Motion `width: auto`, stepped per character), so the icons after it move along instead of jumping.
 *   After the entrance — or when it already played this session — names appear and disappear without delay.
 * Every link is named by aria-label either way, so the label spans are hidden from assistive tech.
 */
function DesktopAdaptiveNavigation({ links }: NavigationProps) {
  const t = useTranslations('common');
  const reduceMotion = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [labelled, setLabelled] = useState(false);
  const [entrance, setEntrance] = useState(true);

  useEffect(() => {
    const area = areaRef.current;
    const measure = measureRef.current;
    if (!area || !measure) return;

    if (hasSeenIntro()) setEntrance(false);
    const query = window.matchMedia(LABELS_FROM);
    const update = () => setLabelled(query.matches && measure.offsetWidth <= area.clientWidth);

    const observer = new ResizeObserver(update);
    observer.observe(area);
    observer.observe(measure);
    query.addEventListener('change', update);
    void document.fonts?.ready.then(update);

    return () => {
      observer.disconnect();
      query.removeEventListener('change', update);
    };
  }, []);

  // The first time the names show is the entrance; any later change is a resize and should not replay it.
  useEffect(() => {
    if (!labelled) return;
    const timer = window.setTimeout(() => setEntrance(false), 3000);
    return () => window.clearTimeout(timer);
  }, [labelled]);

  const items = links.map(link => ({ ...link, label: t(link.t) }));
  let typedBefore = 0;

  return (
    <nav aria-label="Primary" className="relative z-50 hidden min-w-0 flex-1 lg:flex">
      <div ref={areaRef} className="flex min-w-0 flex-1 items-center justify-center">
        <TooltipProvider delay={150}>
          <div className="flex items-center gap-1 py-2">
            {items.map((link, index) => {
              const characters = link.label.length;
              const typing = labelled && entrance && !reduceMotion;
              const delay = TYPE_START + typedBefore * TYPE_STEP;
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
                    style={{ '--pop-delay': `${0.5 + index * 0.08}s` } as CSSProperties}>
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
