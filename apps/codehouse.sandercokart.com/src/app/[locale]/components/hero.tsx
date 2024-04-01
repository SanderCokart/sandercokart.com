import Image from 'next/image';
import Link from 'next/link';

import LogoINV from '@/public/static/images/logo/Logo-INV.png';
import Logo from '@/public/static/images/logo/Logo.png';

import { getScopedI18n } from '@/locales/server';

export async function Hero() {
  const t = await getScopedI18n('home.hero');

  return (
    <section
      className="container flex min-h-[calc(100dvh-theme(spacing.11))] max-w-4xl items-center justify-center gap-8 sm:min-h-[calc(100dvh-theme(spacing.16))]"
      id="hero">
      <article className="flex-none md:w-7/12">
        <h2 className="max-w-md text-center text-4xl font-bold uppercase sm:text-left sm:text-5xl">{t('title')}</h2>
        <p className="mt-4 max-w-md text-center text-xl sm:text-left md:text-2xl">{t('description')}</p>
        <p className="dark:text-secondaryLight mt-4 max-w-md cursor-pointer text-center text-xl font-bold text-secondary hover:opacity-70 sm:text-left md:text-3xl">
          <Link href="/#contact">{t('contact')}</Link>
        </p>
      </article>
      <div className="-order-1 grid place-items-center md:order-none">
        <Image priority alt="Logo" className="block w-2/3 dark:hidden sm:w-full" src={LogoINV} />
        <Image priority alt="Logo" className="hidden w-2/3 dark:block sm:w-full" src={Logo} />
      </div>
    </section>
  );
}
