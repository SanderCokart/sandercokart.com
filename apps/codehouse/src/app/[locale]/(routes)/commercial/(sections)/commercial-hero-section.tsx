'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { SegmentLogo } from '@/components/segment-logo';

import { heroItem, heroStagger } from '@/lib/hero-reveal';
import { MotionDiv } from '@/lib/motion';

import { MockBarChart, MockSidebar, MockStat, MockTableRow, MockWindow } from './components/mock-ui';

const dashboardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.75 },
  },
};

const dashboardPanel = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const CommercialHeroSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialHero');

  const navItems = [t('mock_nav_overview'), t('mock_nav_customers'), t('mock_nav_numbers'), t('mock_nav_schedule')];

  return (
    <section
      className={cn('mt-16', 'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]', className)}
      id="hero"
      {...props}>
      <div className="container flex max-w-7xl flex-col gap-10 pb-4">
        <MotionDiv
          variants={heroStagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6 text-center">
          <span className="sc-logo-glow">
            <SegmentLogo label="Sander's CodeHouse" className="h-auto w-36 sm:w-40" />
          </span>
          <MotionDiv variants={heroItem}>
            <h1 className="mx-auto max-w-4xl text-3xl font-bold text-balance uppercase sm:text-5xl">
              {t.rich('title', {
                highlight: chunks => <span className="text-accent-ink">{chunks}</span>,
              })}
            </h1>
          </MotionDiv>
          <MotionDiv variants={heroItem}>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance sm:text-xl">
              {t('description')}
            </p>
          </MotionDiv>
          <MotionDiv variants={heroItem} className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<a href="#ask-for-a-quote" />} nativeButton={false}>
              {t('cta_primary')}
            </Button>
            <Button size="lg" variant="outline" render={<a href="#examples" />} nativeButton={false}>
              {t('cta_secondary')}
            </Button>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          className="relative w-full"
          variants={dashboardContainer}
          initial="hidden"
          animate="show"
          aria-hidden>
          <div
            className={cn(
              'pointer-events-none absolute -inset-x-8 -top-4 -bottom-8 z-0',
              'to-background bg-linear-to-b from-transparent via-transparent',
            )}
          />
          <MockWindow title={t('mock_window_title')} className="relative z-10">
            <div className="flex min-h-72 sm:min-h-88">
              <MockSidebar items={navItems} />
              <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
                <MotionDiv variants={dashboardPanel} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <MockStat label={t('mock_stat_orders')} value="1,284" trend={t('mock_stat_orders_trend')} />
                  <MockStat label={t('mock_stat_revenue')} value="€48.2k" trend={t('mock_stat_revenue_trend')} />
                  <MockStat label={t('mock_stat_clients')} value="326" trend={t('mock_stat_clients_trend')} />
                  <MockStat label={t('mock_stat_uptime')} value="99.8%" trend={t('mock_stat_uptime_trend')} />
                </MotionDiv>
                <div className="grid flex-1 gap-3 sm:grid-cols-5">
                  <MotionDiv
                    variants={dashboardPanel}
                    className="border-border/40 bg-background/40 col-span-3 rounded-md border p-3">
                    <p className="text-muted-foreground mb-2 text-[10px] tracking-wider uppercase">
                      {t('mock_chart_label')}
                    </p>
                    <MockBarChart heights={[42, 58, 47, 72, 65, 88, 76, 91, 70, 84, 95, 78]} />
                  </MotionDiv>
                  <MotionDiv
                    variants={dashboardPanel}
                    className="border-border/40 bg-background/40 col-span-2 overflow-hidden rounded-md border">
                    <p className="text-muted-foreground border-border/40 border-b px-3 py-2 text-[10px] tracking-wider uppercase">
                      {t('mock_activity_label')}
                    </p>
                    <MockTableRow
                      cells={[t('mock_row_1_name'), t('mock_row_1_status'), t('mock_row_1_time')]}
                      highlight
                    />
                    <MockTableRow cells={[t('mock_row_2_name'), t('mock_row_2_status'), t('mock_row_2_time')]} />
                    <MockTableRow cells={[t('mock_row_3_name'), t('mock_row_3_status'), t('mock_row_3_time')]} />
                    <MockTableRow cells={[t('mock_row_4_name'), t('mock_row_4_status'), t('mock_row_4_time')]} />
                  </MotionDiv>
                </div>
              </div>
            </div>
          </MockWindow>
        </MotionDiv>
      </div>
    </section>
  );
};
