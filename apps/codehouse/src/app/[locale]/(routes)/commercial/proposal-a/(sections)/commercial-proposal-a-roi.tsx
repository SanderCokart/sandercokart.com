'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const outcomes = [
  {
    pain: 'items_spreadsheets_pain',
    outcome: 'items_spreadsheets_outcome',
  },
  {
    pain: 'items_silos_pain',
    outcome: 'items_silos_outcome',
  },
  {
    pain: 'items_manual_pain',
    outcome: 'items_manual_outcome',
  },
  {
    pain: 'items_scale_pain',
    outcome: 'items_scale_outcome',
  },
] as const;

export const CommercialProposalARoi: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalARoi');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-8 sm:scroll-mt-16', className)}
      id="roi"
      {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">
          {t.rich('description', richText)}
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {outcomes.map((item, index) => (
          <MotionDiv
            key={item.pain}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
            className="border-accent/40 dark:border-primary/40 bg-card/40 flex flex-col gap-3 border-y py-5 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-muted-foreground flex-1 text-sm sm:text-base">{t.rich(item.pain, richText)}</p>
            <ArrowRightIcon
              className="text-primary dark:text-accent hidden size-5 shrink-0 sm:block"
              aria-hidden
            />
            <p className="text-foreground flex-1 text-sm font-medium sm:text-right sm:text-base">
              {t.rich(item.outcome, richText)}
            </p>
          </MotionDiv>
        ))}
      </div>

      <p className="text-muted-foreground mx-auto max-w-2xl text-center text-sm text-balance">
        {t.rich('footnote', richText)}
      </p>
    </section>
  );
};
