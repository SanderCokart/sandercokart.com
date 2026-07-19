'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import LogoINV from '@/public/static/images/logo/Logo-INV.png';
import Logo from '@/public/static/images/logo/Logo.png';
import { Link } from '@/src/i18n/navigation';
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

export function FreelanceProposalBHero() {
  const t = useTranslations('FreelanceProposalBHero');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn(
        'relative mt-16 overflow-hidden',
        'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]',
      )}
      id="hero">
      <div
        aria-hidden
        className="from-primary/10 via-background to-accent/10 dark:from-accent/15 dark:via-background dark:to-primary/10 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b"
      />

      <MotionDiv
        className="container flex max-w-screen-lg flex-col items-center gap-8"
        initial="hidden"
        animate="show"
        variants={heroContainer}>
        <MotionDiv variants={fadeUp}>
          <Image priority alt="Logo" className="mx-auto block max-w-xs sm:w-1/5 dark:hidden" src={LogoINV} />
          <Image priority alt="Logo" className="mx-auto hidden max-w-xs sm:w-1/5 dark:block" src={Logo} />
        </MotionDiv>

        <MotionDiv variants={fadeUp}>
          <p className="font-digital text-primary dark:text-accent text-center text-sm tracking-widest uppercase">
            {t('eyebrow')}
          </p>
        </MotionDiv>

        <MotionDiv variants={fadeUp}>
          <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold text-balance uppercase sm:text-5xl">
            {t.rich('title', richText)}
          </h1>
        </MotionDiv>

        <MotionDiv variants={fadeUp}>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg text-balance">
            {t.rich('description', richText)}
          </p>
        </MotionDiv>

        <MotionDiv className="flex flex-col items-center gap-3 sm:flex-row" variants={fadeUp}>
          <Button
            size="lg"
            className="min-w-48"
            nativeButton={false}
            render={<Link href={{ pathname: '/freelance/proposal-b', hash: 'quote' }} />}>
            {t('cta_primary')}
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-48"
            nativeButton={false}
            render={<Link href={{ pathname: '/freelance/proposal-b', hash: 'collaboration' }} />}>
            {t('cta_secondary')}
            <ArrowDownIcon data-icon="inline-end" />
          </Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
