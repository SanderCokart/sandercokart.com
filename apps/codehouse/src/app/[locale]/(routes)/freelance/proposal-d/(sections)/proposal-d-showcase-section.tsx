'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import type { ComponentProps, FC } from 'react';

import NaWijzerAdmin from '@/public/static/images/portfolio/nawijzer-admin.png';
import NaWijzerQuestionnaire from '@/public/static/images/portfolio/nawijzer-questionnaire.png';
import { MotionDiv } from '@/src/lib/motion';

const sectionStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const showcaseItems = [
  {
    key: 'questionnaire',
    image: NaWijzerQuestionnaire,
    altKey: 'showcase_questionnaire_alt',
    captionKey: 'showcase_questionnaire_caption',
    roleKey: 'showcase_questionnaire_role',
  },
  {
    key: 'admin',
    image: NaWijzerAdmin,
    altKey: 'showcase_admin_alt',
    captionKey: 'showcase_admin_caption',
    roleKey: 'showcase_admin_role',
  },
] as const;

export const ProposalDShowcaseSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalDShowcase');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('container max-w-screen-lg scroll-mt-16 py-4', className)} id="showcase" {...props}>
      <MotionDiv
        className="flex flex-col gap-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}>
        <MotionDiv variants={sectionReveal} className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="text-accent text-sm font-semibold tracking-[0.18em] uppercase">{t('eyebrow')}</p>
          <h2 className="text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
          <p className="text-muted-foreground text-balance">{t.rich('description', richText)}</p>
        </MotionDiv>

        <MotionDiv variants={sectionReveal} className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold md:text-3xl">{t('project_title')}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{t('project_subtitle')}</p>
            </div>
            <p className="text-accent font-mono text-xs tracking-wider uppercase">{t('project_badge')}</p>
          </div>
          <p className="text-muted-foreground max-w-3xl text-balance">{t.rich('project_description', richText)}</p>
        </MotionDiv>

        <div className="grid gap-6 md:grid-cols-2">
          {showcaseItems.map((item, index) => (
            <MotionDiv
              key={item.key}
              variants={sectionReveal}
              transition={{ delay: index * 0.1 }}
              className="group border-border/60 bg-card/30 overflow-hidden rounded-xl border">
              <figure className="relative">
                <Image
                  alt={t(item.altKey)}
                  src={item.image}
                  className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <figcaption className="from-background/95 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-4 pt-12 pb-4">
                  <p className="text-accent mb-1 font-mono text-[10px] tracking-wider uppercase">{t(item.roleKey)}</p>
                  <p className="text-sm font-semibold">{t(item.captionKey)}</p>
                </figcaption>
              </figure>
            </MotionDiv>
          ))}
        </div>

        <MotionDiv variants={sectionReveal}>
          <ul className="grid gap-3 sm:grid-cols-3">
            {(['scope', 'delivery', 'outcome'] as const).map(highlight => (
              <li
                key={highlight}
                className="border-accent/30 dark:border-primary/30 bg-muted/20 rounded-lg border-l-4 px-4 py-3">
                <p className="mb-1 text-sm font-semibold uppercase">{t(`highlights_${highlight}_title`)}</p>
                <p className="text-muted-foreground text-sm">{t(`highlights_${highlight}_description`)}</p>
              </li>
            ))}
          </ul>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};
