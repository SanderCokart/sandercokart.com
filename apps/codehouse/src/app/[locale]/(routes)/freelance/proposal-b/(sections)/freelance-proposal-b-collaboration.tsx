'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import {
  GitPullRequestIcon,
  MessageSquareIcon,
  RocketIcon,
  UsersIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const steps = [
  { key: 'onboarding', icon: RocketIcon },
  { key: 'agile', icon: UsersIcon },
  { key: 'communication', icon: MessageSquareIcon },
  { key: 'delivery', icon: GitPullRequestIcon },
] as const;

export const FreelanceProposalBCollaboration: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalBCollaboration');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-8 sm:scroll-mt-16', className)}
      id="collaboration"
      {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">
          {t.rich('description', richText)}
        </p>
      </div>

      <ol className="relative m-0 grid list-none gap-6 p-0 lg:grid-cols-4">
        <div
          aria-hidden
          className="bg-accent/30 dark:bg-primary/30 absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 lg:block"
        />

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <li key={step.key} className="m-0">
              <MotionDiv
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}>
                <Card className="border-accent dark:border-primary bg-card/50 relative h-full border-2">
                  <div className="bg-accent text-accent-foreground dark:bg-primary dark:text-primary-foreground absolute -top-3 left-4 flex size-8 items-center justify-center rounded-full font-mono text-sm font-bold">
                    {index + 1}
                  </div>
                  <CardHeader className="flex flex-col gap-4 pt-6">
                    <Icon className="text-primary dark:text-accent size-7" aria-hidden />
                    <CardTitle className="text-lg">{t(`steps_${step.key}_title`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-muted-foreground text-sm text-balance">
                      {t.rich(`steps_${step.key}_description`, richText)}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {([1, 2, 3] as const).map(item => (
                        <li
                          key={item}
                          className="border-accent/40 dark:border-primary/40 border-l-2 pl-3 text-sm">
                          {t(`steps_${step.key}_item_${item}`)}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MotionDiv>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
