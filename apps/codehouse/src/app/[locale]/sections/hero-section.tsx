import { useTranslations } from 'next-intl';

import Image from 'next/image';

import LogoINV from '@/public/static/images/logo/Logo-INV.png';
import Logo from '@/public/static/images/logo/Logo.png';

import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section
      className={cn(
        'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]',
        'min-h-[calc(100dvh-theme(spacing.11))] sm:min-h-[calc(100dvh-theme(spacing.16))]',
        'container flex max-w-4xl flex-col items-center justify-center gap-4 md:flex-row md:gap-8',
      )}
      id="hero">
      <div className="grid place-items-center md:order-1">
        <Image priority alt="Logo" className="block w-2/3 sm:w-full dark:hidden" src={LogoINV} />
        <Image priority alt="Logo" className="hidden w-2/3 sm:w-full dark:block" src={Logo} />
      </div>
      <article className="flex-none space-y-4 md:w-7/12">
        <h2 className="max-w-md text-center text-3xl font-bold uppercase sm:text-left sm:text-5xl">
          {t.rich('title', {
            highlight: chunks => <span className="text-accent">{chunks}</span>,
          })}
        </h2>
        <p className="text-center text-xl sm:text-left md:text-2xl">{t('description')}</p>
        <p className="hover:text-accent/80 dark:text-accent dark:hover:text-accent/80 cursor-pointer text-center text-xl font-bold transition-colors sm:text-left md:text-3xl">
          <Link href="/apps/codehouse.sandercokart.com/public#contact">{t('contact')}</Link>
        </p>
      </article>
    </section>
  );
}
