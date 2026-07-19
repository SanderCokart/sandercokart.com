'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import type { ComponentProps, FC } from 'react';

import LogoINV from '@/public/static/images/logo/Logo-INV.png';
import Logo from '@/public/static/images/logo/Logo.png';
import { MotionDiv } from '@/src/lib/motion';

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

export const ProposalBHeroSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalBHero');

  return (
    <section
      className={cn(
        'mt-16',
        'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]',
        className,
      )}
      id="hero"
      {...props}>
      <MotionDiv
        className="container flex max-w-screen-lg flex-col items-center gap-8"
        initial="hidden"
        animate="show"
        variants={heroContainer}>
        <MotionDiv variants={fadeUp}>
          <Image
            priority
            alt="Sander's CodeHouse"
            className="mx-auto block max-w-xs dark:hidden sm:w-1/5"
            src={LogoINV}
          />
          <Image
            priority
            alt="Sander's CodeHouse"
            className="mx-auto hidden max-w-xs dark:block sm:w-1/5"
            src={Logo}
          />
        </MotionDiv>

        <MotionDiv variants={fadeUp}>
          <h1 className="mx-auto max-w-4xl text-balance text-center text-3xl font-bold uppercase sm:text-5xl">
            {t.rich('title', {
              highlight: chunks => <span className="text-accent">{chunks}</span>,
            })}
          </h1>
        </MotionDiv>

        <MotionDiv variants={fadeUp}>
          <p className="text-muted-foreground mx-auto max-w-2xl text-balance text-center text-lg sm:text-xl">
            {t('description')}
          </p>
        </MotionDiv>

        <MotionDiv className="flex flex-wrap items-center justify-center gap-3" variants={fadeUp}>
          <Button size="lg" render={<a href="#ask-for-a-quote" />} nativeButton={false}>
            {t('cta_primary')}
          </Button>
          <Button size="lg" variant="outline" render={<a href="#how-we-work" />} nativeButton={false}>
            {t('cta_secondary')}
          </Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};