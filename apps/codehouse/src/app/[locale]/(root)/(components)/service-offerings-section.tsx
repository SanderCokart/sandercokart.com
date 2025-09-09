'use client';

import { Card, CardContent, CardHeader } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaCode, FaDatabase, FaGlobe } from 'react-icons/fa';

export function ServiceOfferingsSection() {
  const t = useTranslations('services.services');

  const services = [
    {
      icon: <FaCode className="h-16 w-16" />,
      title: t('freelance.title'),
      description: t('freelance.description'),
      features: [
        t('freelance.features.react'),
        t('freelance.features.fullstack'),
        t('freelance.features.agile'),
        t('freelance.features.team'),
        t('freelance.features.onboarding'),
      ],
      color: 'from-blue-500/10 to-blue-500/20',
      iconColor: 'text-blue-500',
    },
    {
      icon: <FaDatabase className="h-16 w-16" />,
      title: t('custom.title'),
      description: t('custom.description'),
      features: [
        t('custom.features.webapps'),
        t('custom.features.database'),
        t('custom.features.api'),
        t('custom.features.cloud'),
        t('custom.features.security'),
      ],
      color: 'from-purple-500/10 to-purple-500/20',
      iconColor: 'text-purple-500',
    },
    {
      icon: <FaGlobe className="h-16 w-16" />,
      title: t('marketing.title'),
      description: t('marketing.description'),
      features: [
        t('marketing.features.design'),
        t('marketing.features.i18n'),
        t('marketing.features.performance'),
        t('marketing.features.cms'),
        t('marketing.features.mobile'),
      ],
      color: 'from-green-500/10 to-green-500/20',
      iconColor: 'text-green-500',
    },
  ];

  /**
   * Breakpoints:
   * - sm: Targets small screens (typically phones) and adjusts the container width and grid gap.
   * - xl: Targets extra-large screens (large desktops) and configures the grid to have 3 columns.
   */

  return (
    <section
      className={cn(
        'mt-8 sm:mb-16 xl:mt-0',
        'min-h-[calc(100dvh-theme(spacing.11))] sm:min-h-[calc(100dvh-theme(spacing.16))]',
        'grid place-items-center',
      )}
      id="services">
      <article className="container px-0 sm:max-w-screen-sm sm:px-4 xl:max-w-screen-2xl">
        <h1 className="mb-8 text-center text-5xl font-bold">{t('title')}</h1>
        <div className="grid gap-0 sm:gap-8 xl:grid-cols-3">
          {services.map(service => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="group relative overflow-hidden">
              <Card
                className={cn(
                  'grid grid-rows-[1fr,1fr,2fr,3fr]',
                  'h-full bg-gradient-to-b',
                  service.color,
                  'rounded-none transition-transform sm:rounded-lg',
                )}>
                <CardHeader className="grid grid-rows-subgrid">
                  <div className={`flex items-center justify-center ${service.iconColor}`}>{service.icon}</div>
                  <h2 className="mt-4 text-center text-3xl font-bold">{service.title}</h2>
                </CardHeader>
                <CardContent className="grid grid-rows-subgrid row-span-2">
                  <p className="mt-2 text-center text-lg">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </article>
    </section>
  );
}
