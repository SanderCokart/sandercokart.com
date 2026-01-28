import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC } from 'react';

export const ConsumersWhyChooseSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('BespokeWhyChooseSection');

  return (
    <section className={cn('container scroll-mt-16 sm:scroll-mt-16', className)} id="why-choose-consumers" {...props}>
      <h2 className="mb-8 text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="mb-8 text-balance text-center">
        {t.rich('description', {
          highlight: chunks => <span className="text-primary dark:text-accent font-medium">{chunks}</span>,
        })}
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{t('features_uniqueness_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {t.rich('features_uniqueness_description', {
              highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
            })}
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{t('features_scalability_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {t.rich('features_scalability_description', {
              highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
            })}
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{t('features_ownership_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {t.rich('features_ownership_description', {
              highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
            })}
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{t('features_performance_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {t.rich('features_performance_description', {
              highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
            })}
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{t('features_security_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {t.rich('features_security_description', {
              highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
            })}
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{t('features_support_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {t.rich('features_support_description', {
              highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
