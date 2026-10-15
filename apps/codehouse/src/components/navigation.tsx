'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/components/shadcn/tooltip';
import { cn } from '@repo/ui/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FaArrowUp } from 'react-icons/fa6';

import type { CSSProperties, ReactNode } from 'react';
import type { LinkType } from '@/lib/nav-links';

import { Link } from '@/i18n/navigation';

type NavigationProps = {
  links: readonly LinkType[];
  /**
   * How desktop shows the links: `labels` types each name in; `icons` shows only the link icons, named by
   * aria-label and a tooltip on hover/focus — for sets too long to fit beside the named logo at every width.
   */
  variant?: 'labels' | 'icons';
};

export function Navigation({ links, variant = 'labels' }: NavigationProps) {
  return (
    <>
      {variant === 'icons' ? <DesktopIconNavigation links={links} /> : <DesktopNavigation links={links} />}
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

function DesktopIconNavigation({ links }: NavigationProps) {
  const t = useTranslations('common');

  return (
    <nav aria-label="Primary" className="relative z-50 mx-auto hidden lg:block">
      <TooltipProvider delay={150}>
        <div className="flex items-center gap-2 py-2">
          {links.map((link, index) => {
            const label = t(link.t);

            return (
              <Tooltip key={link.href}>
                <TooltipTrigger
                  render={<Link href={link.href} aria-label={label} />}
                  className={cn(
                    'pop-in grid size-11 place-items-center rounded-lg text-2xl transition-colors',
                    'text-primary-foreground hover:text-accent hover:bg-white/10',
                    'focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none',
                  )}
                  style={{ '--pop-delay': `${0.5 + index * 0.1}s` } as CSSProperties}>
                  <span aria-hidden>{link.icon}</span>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8} className="font-digital text-sm tracking-wide">
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          })}
          <BackToTopButton className="ml-2 rounded-md p-2 text-xl md:text-2xl" />
        </div>
      </TooltipProvider>
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
