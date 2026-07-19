'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const technologies = ['next', 'react', 'laravel', 'typescript'] as const;

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stripStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const techItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const ProposalCTechSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalCTechSection');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('container max-w-screen-lg scroll-mt-16 py-4', className)} id="tech" {...props}>
      <MotionDiv
        className="flex flex-col gap-8"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}>
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground text-balance">{t.rich('description', richText)}</p>
        </div>

        <MotionDiv
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          variants={stripStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8%' }}>
          {technologies.map(tech => (
            <MotionDiv
              key={tech}
              variants={techItem}
              className="border-border/60 bg-card/40 group rounded-lg border p-5 transition-colors hover:border-primary/40 dark:hover:border-accent/40">
              <p className="group-hover:text-accent mb-2 font-mono text-sm font-bold tracking-wide uppercase transition-colors">
                {t(`tech_${tech}_name`)}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(`tech_${tech}_description`)}</p>
            </MotionDiv>
          ))}
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};
