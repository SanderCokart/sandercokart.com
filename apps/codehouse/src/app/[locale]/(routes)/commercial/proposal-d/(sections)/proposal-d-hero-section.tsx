'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import type { ComponentProps, FC } from 'react';

import LogoINV from '@/public/static/images/logo/Logo-INV.png';
import Logo from '@/public/static/images/logo/Logo.png';
import { MotionDiv } from '@/src/lib/motion';

import { MockBarChart, MockSidebar, MockStat, MockTableRow, MockWindow } from './components/mock-ui';

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

const dashboardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
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

export const ProposalDHeroSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalDHero');

  const navItems = [t('mock_nav_overview'), t('mock_nav_customers'), t('mock_nav_numbers'), t('mock_nav_schedule')];

  return (
    <section
      className={cn(
        'relative mt-16 overflow-hidden',
        'bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.18)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_hsl(var(--accent)/0.12)_0%,_transparent_45%)]',
        'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]',
        className,
      )}
      id="hero"
      {...props}>
      <MotionDiv
        className="container flex max-w-screen-xl flex-col gap-10 pb-4"
        variants={heroContainer}
        initial="hidden"
        animate="show">
        <MotionDiv variants={fadeUp} className="flex flex-col items-center gap-6 text-center">
          <Image
            priority
            alt="Sander's CodeHouse"
            className="mx-auto block max-w-[11rem] sm:max-w-[8rem] dark:hidden"
            src={LogoINV}
          />
          <Image
            priority
            alt="Sander's CodeHouse"
            className="mx-auto hidden max-w-[11rem] sm:max-w-[8rem] dark:block"
            src={Logo}
          />
          <h1 className="mx-auto max-w-4xl text-balance text-3xl font-bold uppercase sm:text-5xl">
            {t.rich('title', {
              highlight: chunks => <span className="text-accent">{chunks}</span>,
            })}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-balance text-lg sm:text-xl">{t('description')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<a href="#ask-for-a-quote" />} nativeButton={false}>
              {t('cta_primary')}
            </Button>
            <Button size="lg" variant="outline" render={<a href="#examples" />} nativeButton={false}>
              {t('cta_secondary')}
            </Button>
          </div>
        </MotionDiv>

        <MotionDiv
          className="relative w-full"
          variants={dashboardContainer}
          initial="hidden"
          animate="show"
          aria-hidden>
          <div
            className={cn(
              'pointer-events-none absolute -inset-x-8 -bottom-8 -top-4 z-0',
              'bg-gradient-to-b from-transparent via-transparent to-background',
            )}
          />
          <MockWindow title={t('mock_window_title')} className="relative z-10">
            <div className="flex min-h-[18rem] sm:min-h-[22rem]">
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
                    <MockTableRow cells={[t('mock_row_1_name'), t('mock_row_1_status'), t('mock_row_1_time')]} highlight />
                    <MockTableRow cells={[t('mock_row_2_name'), t('mock_row_2_status'), t('mock_row_2_time')]} />
                    <MockTableRow cells={[t('mock_row_3_name'), t('mock_row_3_status'), t('mock_row_3_time')]} />
                    <MockTableRow cells={[t('mock_row_4_name'), t('mock_row_4_status'), t('mock_row_4_time')]} />
                  </MotionDiv>
                </div>
              </div>
            </div>
          </MockWindow>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};
