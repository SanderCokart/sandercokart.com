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
      icon: <FaGlobe className="h-16 w-16" />,
      title: t('marketing_title'),
      description: t('marketing_description'),
      features: [
        t('marketing_features_design'),
        t('marketing_features_i18n'),
        t('marketing_features_performance'),
        t('marketing_features_mobile'),
        t('marketing_features_cms'),
      ],
      color: 'from-green-500/10 to-green-500/20',
      iconColor: 'text-green-500',
      link: '/bespoke-solutions',
      comingSoon: false,
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
      color: 'from-blue-500/10 to-blue-500/20',
      iconColor: 'text-blue-500',
      link: '/web-application-development',
      comingSoon: true,
    },
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
      color: 'from-purple-500/10 to-purple-500/20',
      iconColor: 'text-purple-500',
      link: '/freelance',
      comingSoon: true,
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
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-8 text-center text-5xl font-bold">
          {t('title')}
        </motion.h1>
        <div className="grid gap-0 sm:gap-8 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 + index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden">
              <Card
                className={cn(
                  'grid grid-rows-[1fr,1fr,2fr,2fr,auto]',
                  'h-full bg-gradient-to-b',
                  service.color,
                  'rounded-none transition-colors duration-500 ease-in-out sm:rounded-lg',
                  'has-[a:hover]:from-primary/10 has-[a:hover]:to-primary/20 dark:has-[a:hover]:from-accent/10 dark:has-[a:hover]:to-accent/20',
                  service.comingSoon && 'blur-[2px] brightness-75',
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
                        <span className="dark:text-accent text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="flex items-center justify-center p-4">
                  <Button
                    asChild={!service.comingSoon}
                    variant="ghost"
                    size="lg"
                    disabled={service.comingSoon}
                    className={cn(
                      'text-lg font-semibold duration-500',
                      'hover:bg-primary/30 hover:text-inherit',
                      'dark:hover:bg-accent/60 dark:hover:text-accent-foreground',
                      service.comingSoon && 'cursor-not-allowed',
                    )}>
                    {service.comingSoon ? (
                      <span>{t('callToAction')}</span>
                    ) : (
                      <Link href={service.link}>{t('callToAction')}</Link>
                    )}
                  </Button>
                </div>
              </Card>
              {service.comingSoon && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="font-digital rotate-45 transform text-6xl tracking-widest text-black drop-shadow-[2px_2px_10px_rgba(0,0,0,1)] dark:text-white">
                    COMING SOON...
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </article>
    </section>
  );
}
