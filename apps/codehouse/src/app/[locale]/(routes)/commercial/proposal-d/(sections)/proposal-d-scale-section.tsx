'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { ArrowDownIcon, Building2Icon, LayoutDashboardIcon, PuzzleIcon, WorkflowIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const steps = [
  { key: 'focused', icon: PuzzleIcon },
  { key: 'connected', icon: WorkflowIcon },
  { key: 'platforms', icon: LayoutDashboardIcon },
  { key: 'systems', icon: Building2Icon },
] as const;

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

export const ProposalDScaleSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalDScale');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('flex scroll-mt-16 flex-col gap-8', className)} id="scale" {...props}>
      <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="text-center text-balance">{t.rich('description', richText)}</p>

      <MotionDiv
        className="mx-auto flex w-full max-w-2xl flex-col gap-0"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.key} className="flex flex-col">
              <MotionDiv
                className="border-accent dark:border-primary flex gap-4 border-l-2 py-4 pl-6"
                variants={itemVariants}
                transition={{ duration: 0.4, ease: 'easeOut' }}>
                <div className="bg-card text-primary dark:text-accent flex size-12 shrink-0 items-center justify-center rounded-lg border">
                  <Icon aria-hidden />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <h3 className="text-lg font-semibold">{t(`steps_${step.key}_title`)}</h3>
                  <p className="text-muted-foreground text-balance">
                    {t.rich(`steps_${step.key}_description`, richText)}
                  </p>
                </div>
              </MotionDiv>
              {!isLast ? (
                <div className="text-muted-foreground flex items-center gap-2 pl-6" aria-hidden>
                  <ArrowDownIcon className="size-4" />
                  <span className="bg-border h-px flex-1" />
                </div>
              ) : null}
            </div>
          );
        })}
      </MotionDiv>

      <p className="text-muted-foreground mx-auto max-w-xl text-center text-sm text-balance">{t('footnote')}</p>
    </section>
  );
};
