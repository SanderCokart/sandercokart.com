import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC } from 'react';

export const ConsumersWhyChooseSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('BespokeWhyChooseSection');

  const reasons = [
    { title: 'features_uniqueness_title', description: 'features_uniqueness_description' },
    { title: 'features_scalability_title', description: 'features_scalability_description' },
    { title: 'features_ownership_title', description: 'features_ownership_description' },
    { title: 'features_performance_title', description: 'features_performance_description' },
    { title: 'features_security_title', description: 'features_security_description' },
    { title: 'features_support_title', description: 'features_support_description' },
  ] as const;

  return (
    <section className={cn('container scroll-mt-16 sm:scroll-mt-16', className)} id="why-choose-consumers" {...props}>
      <h2 className="mb-8 text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="mb-8 text-balance text-center">
        {t.rich('description', {
          highlight: chunks => <strong className="text-primary dark:text-accent">{chunks}</strong>,
        })}
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {reasons.map(reason => (
          <Card key={reason.title} className="border-primary group bg-card/50 border-2">
            <CardHeader>
              <CardTitle className="md:group-odd:text-right">{t(reason.title)}</CardTitle>
            </CardHeader>
            <CardContent className="md:group-odd:text-right">
              {t.rich(reason.description, {
                highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
