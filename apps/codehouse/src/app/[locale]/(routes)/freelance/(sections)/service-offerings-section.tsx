'use client';

import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { ComponentProps, FC } from 'react';
import { ArrowRightIcon } from 'lucide-react';

import { Link } from '@/src/i18n/navigation';

export const ServiceOfferingsSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('services');

  return (
    <section className={cn('scroll-mt-16 sm:scroll-mt-16', className)} id="services" {...props}>
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Simple Websites */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">{t('bespoke-solutions.title')}</h2>
          <p className="mb-4 text-muted-foreground">{t('bespoke-solutions.description')}</p>
          <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
            <li>{t('bespoke-solutions.features.blazing-speed')}</li>
            <li>{t('bespoke-solutions.features.hosting-included')}</li>
            <li>{t('bespoke-solutions.features.internationalization')}</li>
            <li>{t('bespoke-solutions.features.responsive-design')}</li>
            <li>{t('bespoke-solutions.features.unique-visuals')}</li>
          </ul>
          <Link
            className="inline-flex items-center text-primary hover:underline"
            href="/bespoke-solutions">
            {t('bespoke-solutions.call-to-action')} <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Freelance Development */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">{t('freelance.title')}</h2>
          <p className="mb-4 text-muted-foreground">{t('freelance.description')}</p>
          <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
            <li>{t('freelance.features.agile-git')}</li>
            <li>{t('freelance.features.client-side-apps')}</li>
            <li>{t('freelance.features.fast-integration')}</li>
            <li>{t('freelance.features.laravel-apis')}</li>
            <li>{t('freelance.features.nextjs-solution')}</li>
          </ul>
          <Link className="inline-flex items-center text-primary hover:underline" href="/freelance">
            {t('freelance.call-to-action')} <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Custom Software Solutions */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">{t('web-application-development.title')}</h2>
          <p className="mb-4 text-muted-foreground">{t('web-application-development.description')}</p>
          <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
            <li>{t('web-application-development.features.custom-webapps')}</li>
            <li>{t('web-application-development.features.database-storage')}</li>
            <li>{t('web-application-development.features.scalable-cloud')}</li>
            <li>{t('web-application-development.features.secure-api')}</li>
            <li>{t('web-application-development.features.security-implementation')}</li>
          </ul>
          <Link
            className="inline-flex items-center text-primary hover:underline"
            href="/web-application-development">
            {t('web-application-development.call-to-action')} <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
