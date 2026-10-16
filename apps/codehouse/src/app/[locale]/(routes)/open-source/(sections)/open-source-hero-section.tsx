'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { SegmentLogo } from '@/components/segment-logo';

import { heroItem, heroStagger } from '@/lib/hero-reveal';
import { MotionDiv } from '@/lib/motion';

export const OpenSourceHeroSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('OpenSourceHero');

  return (
    <section
      className={cn('mt-16', 'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]', className)}
      id="hero"
      {...props}>
      <article className="container flex max-w-5xl flex-col items-center gap-8">
        <MotionDiv className="flex flex-col items-center gap-6" variants={heroStagger} initial="hidden" animate="show">
          <span className="sc-logo-glow">
            <SegmentLogo label="Sander's CodeHouse" className="h-auto w-36 sm:w-40" />
          </span>

          <MotionDiv variants={heroItem}>
            <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold text-balance uppercase sm:text-5xl">
              {t.rich('title', {
                highlight: chunks => <span className="text-accent">{chunks}</span>,
              })}
            </h1>
          </MotionDiv>

          <MotionDiv variants={heroItem}>
            <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg text-balance">
              {t('description')}
            </p>
          </MotionDiv>

          <MotionDiv variants={heroItem} className="flex flex-col items-center gap-3 sm:flex-row">
            <Button size="lg" className="min-w-48" nativeButton={false} render={<a href="#projects" />}>
              {t('cta_primary')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-48"
              nativeButton={false}
              render={<a href="#ask-for-a-quote" />}>
              {t('cta_secondary')}
            </Button>
          </MotionDiv>
        </MotionDiv>
      </article>
    </section>
  );
};
