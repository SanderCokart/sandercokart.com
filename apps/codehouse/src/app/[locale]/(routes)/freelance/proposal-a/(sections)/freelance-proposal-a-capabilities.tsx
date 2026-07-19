'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import {
  CodeIcon,
  GitBranchIcon,
  LayersIcon,
  RocketIcon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MotionDiv } from '@/src/lib/motion';

import type { ComponentProps, FC } from 'react';

const capabilities = [
  { icon: CodeIcon, title: 'items_react_title', description: 'items_react_description' },
  { icon: LayersIcon, title: 'items_fullstack_title', description: 'items_fullstack_description' },
  { icon: ShieldCheckIcon, title: 'items_quality_title', description: 'items_quality_description' },
  { icon: GitBranchIcon, title: 'items_agile_title', description: 'items_agile_description' },
  { icon: UsersIcon, title: 'items_team_title', description: 'items_team_description' },
  { icon: RocketIcon, title: 'items_onboarding_title', description: 'items_onboarding_description' },
] as const;

export const FreelanceProposalACapabilities: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalACapabilities');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-8 sm:scroll-mt-16', className)}
      id="capabilities"
      {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">
          {t.rich('description', richText)}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;

          return (
            <MotionDiv
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}>
              <Card className="border-accent dark:border-primary group bg-card/50 h-full border-2">
                <CardHeader className="flex flex-col gap-4">
                  <Icon className="text-primary dark:text-accent size-8" aria-hidden />
                  <CardTitle className="md:group-odd:text-right">{t(capability.title)}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground md:group-odd:text-right">
                  {t.rich(capability.description, richText)}
                </CardContent>
              </Card>
            </MotionDiv>
          );
        })}
      </div>
    </section>
  );
};
