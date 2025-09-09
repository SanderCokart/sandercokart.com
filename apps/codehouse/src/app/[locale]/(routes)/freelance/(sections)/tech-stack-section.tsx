'use client';

import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC } from 'react';

export const TechStackSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('services.tech-stack');

  return (
    <section className={cn('scroll-mt-16 sm:scroll-mt-16', className)} id="tech-stack" {...props}>
      <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Next.js */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">Next.js</h2>
          <p>{t('next')}</p>
        </div>

        {/* React */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">React</h2>
          <p>{t('react')}</p>
        </div>

        {/* Laravel */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">Laravel</h2>
          <p>{t('laravel')}</p>
        </div>

        {/* Vue.js */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">Vue.js</h2>
          <p>{t('vue')}</p>
        </div>
      </div>
    </section>
  );
};
