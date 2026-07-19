'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import type { ComponentProps, FC } from 'react';

import LogoINV from '@/public/static/images/logo/Logo-INV.png';
import Logo from '@/public/static/images/logo/Logo.png';
import { Link } from '@/src/i18n/navigation';
import { MotionDiv, MotionSpan } from '@/src/lib/motion';

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const pipelineStages = ['concept', 'discovery', 'build', 'deploy', 'handoff'] as const;

const pipelineContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};

const pipelineStage = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const lineDraw = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const ProposalCHeroSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalCHeroSection');

  return (
    <section
      className={cn(
        'relative mt-16 overflow-hidden',
        'bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.2)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_right,_hsl(var(--accent)/0.14)_0%,_transparent_45%)]',
        className,
      )}
      id="hero"
      {...props}>
      <MotionDiv
        className="container flex max-w-screen-xl flex-col items-center gap-10 pb-8"
        variants={heroContainer}
        initial="hidden"
        animate="show">
        <MotionDiv variants={heroItem} className="flex flex-col items-center gap-5 text-center">
          <Image
            priority
            alt="Sander's CodeHouse"
            className="mx-auto block max-w-[10rem] sm:max-w-[7rem] dark:hidden"
            src={LogoINV}
          />
          <Image
            priority
            alt="Sander's CodeHouse"
            className="mx-auto hidden max-w-[10rem] sm:max-w-[7rem] dark:block"
            src={Logo}
          />
          <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">{t('eyebrow')}</p>
          <h1 className="max-w-4xl text-balance text-3xl font-bold uppercase sm:text-5xl">
            {t.rich('title', {
              highlight: chunks => <span className="text-accent">{chunks}</span>,
            })}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-balance text-lg sm:text-xl">{t('description')}</p>
          <p className="text-muted-foreground max-w-xl text-balance text-sm sm:text-base">{t('supporting')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={{ pathname: '/freelance/proposal-c', hash: 'ask-for-a-quote' }} />}>
              {t('cta_primary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href={{ pathname: '/freelance/proposal-c', hash: 'delivery-phases' }} />}>
              {t('cta_secondary')}
            </Button>
          </div>
        </MotionDiv>

        <MotionDiv
          className="border-border/50 bg-card/30 relative w-full max-w-3xl rounded-xl border p-6 backdrop-blur-sm sm:p-8"
          variants={heroItem}
          aria-label={t('pipeline_aria')}>
          <p className="text-muted-foreground mb-6 text-center text-xs font-medium tracking-wider uppercase">
            {t('pipeline_label')}
          </p>
          <div className="relative">
            <MotionDiv
              className="bg-primary/30 absolute top-5 right-[10%] left-[10%] hidden h-0.5 origin-left sm:block"
              variants={lineDraw}
            />
            <MotionDiv
              className="grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-2"
              variants={pipelineContainer}
              initial="hidden"
              animate="show">
              {pipelineStages.map((stage, index) => (
                <MotionDiv
                  key={stage}
                  variants={pipelineStage}
                  className="flex flex-col items-center gap-2 text-center">
                  <MotionSpan
                    className={cn(
                      'border-primary/60 bg-background flex size-10 items-center justify-center rounded-full border-2 font-mono text-sm font-bold tabular-nums',
                      index === pipelineStages.length - 1 && 'border-accent text-accent',
                    )}>
                    {String(index + 1).padStart(2, '0')}
                  </MotionSpan>
                  <span className="text-xs font-semibold tracking-wide uppercase sm:text-[11px]">
                    {t(`pipeline_${stage}`)}
                  </span>
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};
