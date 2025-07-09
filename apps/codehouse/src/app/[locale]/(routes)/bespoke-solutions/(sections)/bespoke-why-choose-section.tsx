import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { ComponentProps, FC } from 'react';

export const BespokeWhyChooseSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('bespoke-solutions-page');

  return (
    <section className={cn('container scroll-mt-16 sm:scroll-mt-16', className)} id="why-choose-bespoke" {...props}>
      <h2 className="mb-8 text-center text-3xl font-bold uppercase sm:text-5xl">
        {t('why-choose-bespoke.title')}
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('why-choose-bespoke.uniqueness.title')}</h3>
          <p>{t('why-choose-bespoke.uniqueness.description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('why-choose-bespoke.scalability.title')}</h3>
          <p>{t('why-choose-bespoke.scalability.description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('why-choose-bespoke.ownership.title')}</h3>
          <p>{t('why-choose-bespoke.ownership.description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('why-choose-bespoke.performance.title')}</h3>
          <p>{t('why-choose-bespoke.performance.description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('why-choose-bespoke.security.title')}</h3>
          <p>{t('why-choose-bespoke.security.description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('why-choose-bespoke.support.title')}</h3>
          <p>{t('why-choose-bespoke.support.description')}</p>
        </div>
      </div>
    </section>
  );
}; 