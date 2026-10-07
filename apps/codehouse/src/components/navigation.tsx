'use client';

import { cn } from '@repo/ui/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FaArrowUp } from 'react-icons/fa6';

import type { ReactNode } from 'react';

import { Link } from '@/src/i18n/navigation';
import type { LinkType } from '@/src/lib/nav-links';

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

function DesktopNavigation({ links }: NavigationProps) {
  const t = useTranslations('common');

  return (
    <nav aria-label="Primary" className={cn('relative z-50 mx-auto hidden w-full max-w-4xl lg:block')}>
      <div className="flex items-center gap-6 py-2 md:gap-8">
        <div className="flex flex-1 place-items-center items-center justify-center gap-8">
          {links.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              className={cn(
                'group',
                'font-digital flex items-center justify-center gap-2 rounded-md px-2 py-1',
                'text-primary-foreground hover:text-accent',
                'text-xs md:text-2xl',
              )}>
              <span className="inline-block origin-center transition-transform duration-150 group-hover:scale-105">
                {t(link.t)}
              </span>
            </NavLink>
          ))}
        </div>
        <BackToTopButton className="rounded-md p-2 text-xl md:text-2xl" />
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
      <BackToTopButton className="text-2xl w-10" />
    </nav>
  );
}
