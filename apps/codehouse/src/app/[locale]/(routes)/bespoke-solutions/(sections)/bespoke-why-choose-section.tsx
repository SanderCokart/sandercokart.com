import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { ComponentProps, FC } from 'react';

export const BespokeWhyChooseSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('BespokeWhyChooseSection');

  return (
    <section className={cn('container scroll-mt-16 sm:scroll-mt-16', className)} id="why-choose-bespoke" {...props}>
      <h2 className="mb-8 text-center text-3xl font-bold uppercase sm:text-5xl">
        {t('title')}
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('features_uniqueness_title')}</h3>
          <p>{t('features_uniqueness_description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('features_scalability_title')}</h3>
          <p>{t('features_scalability_description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('features_ownership_title')}</h3>
          <p>{t('features_ownership_description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('features_performance_title')}</h3>
          <p>{t('features_performance_description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('features_security_title')}</h3>
          <p>{t('features_security_description')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">{t('features_support_title')}</h3>
          <p>{t('features_support_description')}</p>
        </div>
      </div>
    </section>
  );
}; 