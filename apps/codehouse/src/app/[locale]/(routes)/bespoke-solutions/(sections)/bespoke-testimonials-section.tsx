import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC, useMemo } from 'react';

import { GenericTestimonialsSection } from '@/src/components/generic-testimonials-section';

export const BespokeTestimonialsSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('BespokeTestimonialsSection');

  const testimonials = useMemo(
    () =>
      [], // No bespoke testimonials defined in the JSON under the new structure yet.
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
