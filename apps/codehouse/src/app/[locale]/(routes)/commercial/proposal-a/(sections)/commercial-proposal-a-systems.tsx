'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import {
  CalendarCheckIcon,
  LayoutDashboardIcon,
  PackageIcon,
  ShieldCheckIcon,
  UsersIcon,
  WarehouseIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const systems = [
  {
    icon: UsersIcon,
    title: 'items_crm_title',
    description: 'items_crm_description',
  },
  {
    icon: LayoutDashboardIcon,
    title: 'items_dashboards_title',
    description: 'items_dashboards_description',
  },
  {
    icon: ShieldCheckIcon,
    title: 'items_portals_title',
    description: 'items_portals_description',
  },
  {
    icon: CalendarCheckIcon,
    title: 'items_booking_title',
    description: 'items_booking_description',
  },
  {
    icon: PackageIcon,
    title: 'items_inventory_title',
    description: 'items_inventory_description',
  },
  {
    icon: WarehouseIcon,
    title: 'items_internal_title',
    description: 'items_internal_description',
  },
] as const;

export const CommercialProposalASystems: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialProposalASystems');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-8 sm:scroll-mt-16', className)}
      id="systems"
      {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">
          {t.rich('description', richText)}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {systems.map((system, index) => {
          const Icon = system.icon;

          return (
            <MotionDiv
              key={system.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}>
              <Card className="border-accent dark:border-primary bg-card/50 h-full border-2">
                <CardHeader className="flex flex-col gap-4">
                  <Icon className="text-primary dark:text-accent size-8" aria-hidden />
                  <CardTitle>{t(system.title)}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{t.rich(system.description, richText)}</CardContent>
              </Card>
            </MotionDiv>
          );
        })}
      </div>
    </section>
  );
};
