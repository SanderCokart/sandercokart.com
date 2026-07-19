import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import LogoINV from '@/public/static/images/logo/Logo-INV.png';
import Logo from '@/public/static/images/logo/Logo.png';

import { MotionLi, MotionUl } from '@/src/lib/motion';

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
    <section
      className={cn(
        'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]',
        'mt-16',
      )}
      id="hero">
      <article className="flex flex-col gap-8">
        <Image priority alt="Logo" className="tw-w-full max-w-xs mx-auto block sm:w-1/5 dark:hidden" src={LogoINV} />
        <Image priority alt="Logo" className="tw-w-full max-w-xs mx-auto hidden sm:w-1/5 dark:block" src={Logo} />

        <h2 className="text-balance text-center text-3xl max-w-6xl mx-auto font-bold uppercase sm:text-5xl">
          {t.rich('title', {
            highlight: chunks => <span className="text-accent">{chunks}</span>,
          })}
        </h2>
        
      </article>
    </section>
  );
}
