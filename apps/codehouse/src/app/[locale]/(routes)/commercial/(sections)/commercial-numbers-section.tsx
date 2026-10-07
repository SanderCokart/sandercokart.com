'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

import { MockBarChart, MockStat, MockWindow } from './components/mock-ui';

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const CommercialNumbersSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialNumbers');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('container max-w-(--breakpoint-lg) scroll-mt-16 py-4', className)} id="numbers" {...props}>
      <MotionDiv
        className="grid items-center gap-10 lg:grid-cols-2"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12%' }}>
        <MotionDiv variants={sectionReveal} className="space-y-4">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground text-balance">{t.rich('description', richText)}</p>
        </MotionDiv>
        <MotionDiv variants={sectionReveal} aria-hidden>
          <MockWindow title={t('mock_title')}>
            <div className="space-y-3 p-3 sm:p-4">
              <div className="grid grid-cols-3 gap-2">
                <MockStat label={t('mock_stat_sales')} value="4.8%" trend={t('mock_stat_sales_trend')} />
                <MockStat label={t('mock_stat_returning')} value="91%" trend={t('mock_stat_returning_trend')} />
                <MockStat label={t('mock_stat_rating')} value="4.6" trend={t('mock_stat_rating_trend')} />
              </div>
              <div className="border-border/40 bg-background/40 rounded-md border p-3">
                <p className="text-muted-foreground mb-3 text-[10px] tracking-wider uppercase">{t('mock_chart_label')}</p>
                <MockBarChart heights={[35, 48, 52, 61, 58, 74, 69, 82, 78, 90, 86, 94]} />
              </div>
            </div>
          </MockWindow>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};
