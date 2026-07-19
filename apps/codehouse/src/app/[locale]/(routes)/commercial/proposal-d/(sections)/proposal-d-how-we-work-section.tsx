'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const phases = ['talk', 'build', 'handoff'] as const;

const phaseVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const ProposalDHowWeWorkSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalDHowWeWork');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('flex scroll-mt-16 flex-col gap-8', className)} id="how-we-work" {...props}>
      <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="text-center text-balance">{t.rich('description', richText)}</p>

      <ol className="m-0 grid list-none gap-8 p-0 md:grid-cols-3">
        {phases.map((phase, index) => (
          <li key={phase} className="m-0">
            <MotionDiv
              className="relative flex flex-col gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={phaseVariants}
              transition={{ duration: 0.4, delay: index * 0.12, ease: 'easeOut' }}>
              <div className="flex items-baseline gap-3">
                <span className="text-accent font-mono text-4xl font-bold tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-semibold uppercase">{t(`phases_${phase}_title`)}</h3>
              </div>
              <p className="text-muted-foreground text-balance">
                {t.rich(`phases_${phase}_description`, richText)}
              </p>
              <ul className="flex flex-col gap-2">
                {([1, 2, 3] as const).map(item => (
                  <li key={item} className="border-accent/40 dark:border-primary/40 border-l-2 pl-3 text-sm">
                    {t(`phases_${phase}_item_${item}`)}
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </li>
        ))}
      </ol>
    </section>
  );
};
