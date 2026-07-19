'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

import { MockCalendarDay, MockWindow } from './components/mock-ui';

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

const dayMeta = [
  { day: '1', busy: false },
  { day: '2', busy: true },
  { day: '3', busy: false },
  { day: '4', busy: true },
  { day: '5', busy: true },
  { day: '6', busy: false },
  { day: '7', busy: false },
  { day: '8', busy: true },
  { day: '9', busy: false },
  { day: '10', busy: true },
  { day: '11', busy: false },
  { day: '12', busy: true },
  { day: '13', busy: true },
  { day: '14', busy: false },
  { day: '15', busy: false },
  { day: '16', busy: true },
  { day: '17', busy: false },
  { day: '18', busy: true },
  { day: '19', busy: false },
  { day: '20', busy: true },
  { day: '21', busy: false },
] as const;

export const ProposalCBookingSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalCBookingSection');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('container max-w-screen-lg scroll-mt-16 py-4', className)} id="booking" {...props}>
      <MotionDiv
        className="grid items-center gap-10 lg:grid-cols-2"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12%' }}>
        <MotionDiv variants={sectionReveal} className="order-2 lg:order-1" aria-hidden>
          <MockWindow title={t('mock_title')} toolbar={<span className="text-muted-foreground text-[10px]">{t('mock_month')}</span>}>
            <div className="space-y-3 p-3 sm:p-4">
              <div className="text-muted-foreground grid grid-cols-7 gap-1.5 text-center text-[9px] tracking-wider uppercase">
                <span>{t('mock_dow_mon')}</span>
                <span>{t('mock_dow_tue')}</span>
                <span>{t('mock_dow_wed')}</span>
                <span>{t('mock_dow_thu')}</span>
                <span>{t('mock_dow_fri')}</span>
                <span>{t('mock_dow_sat')}</span>
                <span>{t('mock_dow_sun')}</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {dayMeta.map((meta, index) => (
                  <MockCalendarDay key={meta.day} day={meta.day} busy={meta.busy} selected={index === 11} />
                ))}
              </div>
              <div className="border-border/40 bg-background/40 space-y-2 rounded-md border p-3">
                <p className="text-xs font-medium">{t('mock_slot_title')}</p>
                <p className="text-muted-foreground text-[11px]">{t('mock_slot_detail')}</p>
              </div>
            </div>
          </MockWindow>
        </MotionDiv>
        <MotionDiv variants={sectionReveal} className="order-1 space-y-4 lg:order-2">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground text-balance">{t.rich('description', richText)}</p>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};
