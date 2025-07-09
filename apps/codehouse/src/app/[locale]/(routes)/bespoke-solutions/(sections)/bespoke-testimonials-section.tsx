import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC, useMemo } from 'react';

import translations from '@/messages/en.json';
import { GenericTestimonialsSection } from '@/src/components/generic-testimonials-section';

const testimonialTranslations = translations.testimonials.bespoke;

export const BespokeTestimonialsSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('testimonials.bespoke');

  const testimonials = useMemo(
    () =>
      Object.entries(testimonialTranslations).map(([key, value]) => ({
        authorKey: `bespoke.${key}.author`,
        quoteKey: `bespoke.${key}.quote`,
      })),
    [t],
  );

  return (
    <GenericTestimonialsSection
      className={cn('container max-w-screen-lg', className)}
      testimonials={testimonials}
      {...props}
    />
  );
};
