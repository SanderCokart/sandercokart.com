'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { FileKey2Icon, HeadsetIcon, ShieldCheckIcon, WrenchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const pillars = [
  { key: 'security', icon: ShieldCheckIcon },
  { key: 'ownership', icon: FileKey2Icon },
  { key: 'maintainability', icon: WrenchIcon },
  { key: 'support', icon: HeadsetIcon },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export const ProposalBTrustSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalBTrust');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('flex scroll-mt-16 flex-col gap-8', className)}
      id="trust"
      {...props}>
      <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="text-center text-balance">{t.rich('description', richText)}</p>

      <MotionDiv
        className="grid gap-6 sm:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}>
        {pillars.map(pillar => {
          const Icon = pillar.icon;

          return (
            <MotionDiv key={pillar.key} variants={cardVariants} transition={{ duration: 0.4, ease: 'easeOut' }}>
              <Card className="border-accent dark:border-primary bg-card/50 h-full border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="stroke-primary dark:stroke-accent" aria-hidden />
                    {t(`pillars_${pillar.key}_title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>{t.rich(`pillars_${pillar.key}_description`, richText)}</CardContent>
              </Card>
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </section>
  );
};
