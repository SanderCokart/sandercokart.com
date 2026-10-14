import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { MotionLi, MotionUl } from '@/lib/motion';

import LogoINV from '../../../../../../public/static/images/logo/Logo-INV.png';
import Logo from '../../../../../../public/static/images/logo/Logo.png';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const reverseContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function ConsumersHeroSection() {
  const t = useTranslations('BespokeHeroSection');

  return (
    <section className={cn('dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]', 'mt-16')} id="hero">
      <article className="flex flex-col gap-8">
        <Image priority alt="Logo" className="tw-w-full mx-auto block max-w-xs sm:w-1/5 dark:hidden" src={LogoINV} />
        <Image priority alt="Logo" className="tw-w-full mx-auto hidden max-w-xs sm:w-1/5 dark:block" src={Logo} />

        <h2 className="mx-auto max-w-6xl text-center text-3xl font-bold text-balance uppercase sm:text-5xl">
          {t.rich('title', {
            highlight: chunks => <span className="text-accent">{chunks}</span>,
          })}
        </h2>
      </article>
    </section>
  );
}
