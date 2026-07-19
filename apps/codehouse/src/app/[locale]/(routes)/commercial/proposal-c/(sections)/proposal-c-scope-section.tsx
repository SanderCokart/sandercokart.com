'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const scaleSteps = [
  {
    key: 'micro',
    width: 'w-[28%]',
    label: 'steps_micro_label' as const,
    hint: 'steps_micro_hint' as const,
  },
  {
    key: 'module',
    width: 'w-[48%]',
    label: 'steps_module_label' as const,
    hint: 'steps_module_hint' as const,
  },
  {
    key: 'platform',
    width: 'w-full',
    label: 'steps_platform_label' as const,
    hint: 'steps_platform_hint' as const,
  },
] as const;

export const ProposalCScopeSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalCScopeSection');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('container max-w-screen-lg scroll-mt-16 py-4', className)} id="scope" {...props}>
      <MotionDiv
        className="flex flex-col gap-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12%' }}>
        <MotionDiv variants={sectionReveal} className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground text-balance">{t.rich('description', richText)}</p>
        </MotionDiv>

        <MotionDiv variants={sectionReveal} className="space-y-4" aria-hidden>
          {scaleSteps.map((step, index) => (
            <div key={step.key} className="space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-semibold tracking-wide uppercase">{t(step.label)}</p>
                <p className="text-muted-foreground text-xs sm:text-sm">{t(step.hint)}</p>
              </div>
              <div className="bg-muted/40 h-3 overflow-hidden rounded-full">
                <MotionDiv
                  className={cn(
                    'h-full rounded-full',
                    index === 2 ? 'bg-accent' : 'bg-primary/70 dark:bg-primary',
                    step.width,
                  )}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </div>
          ))}
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};
