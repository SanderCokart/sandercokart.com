'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { SegmentLogo } from '@/components/segment-logo';

import { MotionDiv } from '@/lib/motion';

export const OpenSourceHeroSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('OpenSourceHero');

  return (
    <section
      className={cn('mt-16', 'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]', className)}
      id="hero"
      {...props}>
      <article className="container flex max-w-5xl flex-col items-center gap-8">
        <MotionDiv
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}>
          <span className="sc-logo-glow">
            <SegmentLogo label="Sander's CodeHouse" className="h-auto w-36 sm:w-40" />
          </span>

          <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold text-balance uppercase sm:text-5xl">
            {t.rich('title', {
              highlight: chunks => <span className="text-accent">{chunks}</span>,
            })}
          </h1>

          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg text-balance">{t('description')}</p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button size="lg" className="min-w-48" nativeButton={false} render={<a href="#projects" />}>
              {t('cta_primary')}
              <ArrowDownIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-48"
              nativeButton={false}
              render={<a href="#ask-for-a-quote" />}>
              {t('cta_secondary')}
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </MotionDiv>
      </article>
    </section>
  );
};
