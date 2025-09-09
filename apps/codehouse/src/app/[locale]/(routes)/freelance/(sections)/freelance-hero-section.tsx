import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { ComponentProps, FC } from 'react';

export const FreelanceHeroSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('home.hero');

  return (
    <section className={cn('min-h-[calc(100dvh-theme(spacing.11))] sm:min-h-[calc(100dvh-theme(spacing.16))]', 'grid place-items-center', className)} id="hero" {...props}>
      <h1 className="text-center text-3xl font-bold uppercase sm:text-5xl">
        {t.rich('title', {
          highlight: (chunks: string) => <span className="text-accent">{chunks}</span>,
        })}
      </h1>
      <p className="text-balance text-center text-lg text-muted-foreground sm:text-xl">
        {t('description')}
      </p>
      <p className="text-center text-lg font-bold sm:text-xl">{t('contact')}</p>
    </section>
  );
};
