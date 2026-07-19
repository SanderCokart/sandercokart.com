'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const phases = ['kickoff', 'build', 'deploy', 'handoff'] as const;

const sectionStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const phaseCard = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const ProposalCDeliveryPhasesSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalCDeliveryPhasesSection');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container max-w-screen-lg scroll-mt-16 py-4', className)}
      id="delivery-phases"
      {...props}>
      <MotionDiv
        className="flex flex-col gap-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}>
        <MotionDiv variants={sectionReveal} className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
          <p className="text-muted-foreground text-balance">{t.rich('description', richText)}</p>
        </MotionDiv>

        <ol className="relative m-0 grid list-none gap-0 p-0 md:grid-cols-4">
          <div
            className="bg-border/60 absolute top-8 right-[12.5%] left-[12.5%] hidden h-px md:block"
            aria-hidden
          />
          {phases.map((phase, index) => (
            <li key={phase} className="relative m-0">
              <MotionDiv
                className="flex flex-col gap-4 px-2 py-6 md:px-3"
                variants={phaseCard}
                transition={{ delay: index * 0.08 }}>
                <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                  <span className="bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent border-primary/30 dark:border-accent/30 flex size-12 shrink-0 items-center justify-center rounded-full border font-mono text-lg font-bold tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold uppercase">{t(`phases_${phase}_title`)}</h3>
                </div>
                <p className="text-muted-foreground text-center text-balance text-sm md:text-left">
                  {t.rich(`phases_${phase}_description`, richText)}
                </p>
                <ul className="flex flex-col gap-2">
                  {([1, 2, 3] as const).map(item => (
                    <li
                      key={item}
                      className="border-accent/50 dark:border-primary/50 border-l-2 pl-3 text-sm">
                      {t(`phases_${phase}_item_${item}`)}
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            </li>
          ))}
        </ol>
      </MotionDiv>
    </section>
  );
};
