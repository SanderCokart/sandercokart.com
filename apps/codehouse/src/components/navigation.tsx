'use client';

import { cn } from '@repo/ui/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FaArrowUp } from 'react-icons/fa6';

import { links } from '@/src/lib/nav-links';

export function Navigation() {
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
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

function DesktopNavigation() {
  const t = useTranslations('common');
  const mid = Math.floor(links.length / 2);

  return (
    <nav aria-label="Primary" className={cn('relative z-50 mx-auto hidden w-full max-w-4xl lg:block')}>
      <div className={cn('flex items-center justify-center gap-6 py-2 md:gap-8')}>
        {links.slice(0, mid).map(link => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              'font-digital flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-150',
              'text-primary-foreground hover:text-accent hover:scale-105',
              'text-xs md:text-2xl',
            )}>
            {t(`navigation_${link.t}`)}
          </a>
        ))}
        <BackToTopButton className="rounded-md p-2 text-xl md:text-2xl" />
        {links.slice(mid).map(link => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              'font-digital flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-150',
              'text-primary-foreground hover:text-accent hover:scale-105',
              'text-xs md:text-2xl',
            )}>
            {t(`navigation_${link.t}`)}
          </a>
        ))}
      </div>
    </nav>
  );
}

function MobileNavigation() {
  const t = useTranslations('common');
  const mid = Math.floor(links.length / 2);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'bg-primary text-primary-foreground fixed inset-x-0 bottom-0 z-40 flex h-14 w-full items-center justify-evenly text-2xl lg:hidden',
      )}>
      {links.slice(0, mid).map(link => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            'font-digital hover:text-accent flex flex-col items-center gap-1 leading-none transition-colors',
          )}>
          {link.icon}
          <span className="text-xs">{t(`navigation_${link.t}`)}</span>
        </a>
      ))}
      <BackToTopButton className="text-2xl" />
      {links.slice(mid).map(link => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            'font-digital hover:text-accent flex flex-col items-center gap-1 leading-none transition-colors',
          )}>
          {link.icon}
          <span className="text-xs">{t(`navigation_${link.t}`)}</span>
        </a>
      ))}
    </nav>
  );
}
