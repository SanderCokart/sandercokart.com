'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardHeader } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaCode, FaDatabase, FaGlobe } from 'react-icons/fa';

import { Link } from '@/src/i18n/navigation';

export function ServiceOfferingsSection() {
  const t = useTranslations('ServiceOfferingsSection');

  const services = [
    {
      icon: <FaCode className="h-16 w-16" />,
      title: t('freelance_title'),
      description: t('freelance_description'),
      features: [
        t('freelance_features_react'),
        t('freelance_features_fullstack'),
        t('freelance_features_agile'),
        t('freelance_features_team'),
        t('freelance_features_onboarding'),
      ],
      color: 'from-blue-500/10 to-blue-500/20',
      iconColor: 'text-blue-500',
      link: '/freelance',
    },
    {
      icon: <FaDatabase className="h-16 w-16" />,
      title: t('custom_title'),
      description: t('custom_description'),
      features: [
        t('custom_features_webapps'),
        t('custom_features_database'),
        t('custom_features_api'),
        t('custom_features_cloud'),
        t('custom_features_security'),
      ],
      color: 'from-purple-500/10 to-purple-500/20',
      iconColor: 'text-purple-500',
      link: '/web-application-development',
    },
    {
      icon: <FaGlobe className="h-16 w-16" />,
      title: t('marketing_title'),
      description: t('marketing_description'),
      features: [
        t('marketing_features_design'),
        t('marketing_features_i18n'),
        t('marketing_features_performance'),
        t('marketing_features_cms'),
        t('marketing_features_mobile'),
      ],
      color: 'from-yellow-500/10 to-yellow-500/20',
      iconColor: 'text-yellow-500',
      link: '/bespoke-solutions',
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
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden">
              <Card
                className={cn(
                  'grid grid-rows-[1fr,1fr,2fr,2fr,auto]',
                  'h-full bg-gradient-to-b',
                  service.color,
                  'rounded-none transition-colors duration-1000 ease-in-out sm:rounded-lg',
                  'has-[a:hover]:from-accent/10 has-[a:hover]:to-accent/20',
                )}>
                <CardHeader className="grid grid-rows-subgrid">
                  <div className={`flex items-center justify-center ${service.iconColor}`}>{service.icon}</div>
                  <h2 className="mt-4 text-center text-3xl font-bold">{service.title}</h2>
                </CardHeader>
                <CardContent className="row-span-2 grid grid-rows-subgrid">
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
                <div className="flex items-center justify-center p-4">
                  <Button asChild variant="ghost" size="lg" className="text-lg">
                    <Link href={service.link}>{t('callToAction')}</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </article>
    </section>
  );
}
