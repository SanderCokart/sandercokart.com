'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import {
  BoxesIcon,
  ClipboardListIcon,
  DatabaseIcon,
  LayoutTemplateIcon,
  RouteIcon,
  WorkflowIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const skills = [
  { key: 'api', icon: RouteIcon },
  { key: 'database', icon: DatabaseIcon },
  { key: 'frontend', icon: LayoutTemplateIcon },
  { key: 'microservices', icon: BoxesIcon },
  { key: 'devops', icon: WorkflowIcon },
  { key: 'agile', icon: ClipboardListIcon },
] as const;

export const FreelanceSkillsSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceSkills');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-8 sm:scroll-mt-16', className)}
      id="skills"
      {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">
          {t.rich('description', richText)}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <MotionDiv
              key={skill.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}>
              <Card className="border-accent dark:border-primary bg-card/50 h-full border-2">
                <CardHeader className="flex flex-col gap-4">
                  <Icon className="text-primary dark:text-accent size-8" aria-hidden />
                  <CardTitle>{t(`items_${skill.key}_title`)}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {t.rich(`items_${skill.key}_description`, richText)}
                </CardContent>
              </Card>
            </MotionDiv>
          );
        })}
      </div>
    </section>
  );
};
