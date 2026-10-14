'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardHeader } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FaCode, FaDatabase, FaGithub, FaGlobe } from 'react-icons/fa';

import Image from 'next/image';

import logoMark from '@/app/[locale]/images/sc-logo.png';
import { Link } from '@/i18n/navigation';
import { serviceHrefs } from '@/lib/nav-links';

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
      link: serviceHrefs.consumer,
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
      link: serviceHrefs.commercial,
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
      link: serviceHrefs.freelance,
    },
    {
      icon: <FaGithub className="h-16 w-16" />,
      title: t('opensource_title'),
      description: t('opensource_description'),
      features: [
        t('opensource_features_tools'),
        t('opensource_features_download'),
        t('opensource_features_versions'),
        t('opensource_features_licenses'),
        t('opensource_features_public'),
      ],
      color: 'from-orange-500/10 to-orange-500/20',
      iconColor: 'text-orange-500',
      link: serviceHrefs['open-source'],
    },
  ];

  /**
   * Breakpoints:
   * - sm: Targets small screens (typically phones) and adjusts the container width and grid gap.
   * - xl: Four columns so the four offerings sit in a single row on desktop.
   *
   * Vertical placement (xl): a frozen top track centers the English-sized cluster
   * (logo + title + cards). Taller locale copy grows the auto track downward into
   * the leftover 1fr instead of shrinking the top track — so the heading does not
   * jump. `--services-cluster` is that English cluster height (~heading 15rem +
   * cards 36rem). Below xl the cards stack and the section just grows with content.
   */

  return (
    <section
      className={cn(
        'sm:mt-8 sm:mb-16 xl:mt-0',
        'min-h-[calc(100dvh-(--spacing(11)))] sm:min-h-[calc(100dvh-(--spacing(16)))]',
        'grid justify-items-center',
        '[--services-cluster:51rem]',
        'xl:grid-rows-[max(0px,calc((100dvh-(--spacing(16))-var(--services-cluster))/2))_auto_1fr]',
      )}
      id="services">
      <article className="container w-full px-0 sm:max-w-(--breakpoint-sm) sm:px-4 xl:row-start-2 xl:max-w-[120rem]">
        <div className="flex flex-col items-center">
          <Image
            priority
            alt="Sander's CodeHouse"
            src={logoMark}
            className="mx-auto mb-4 h-auto max-w-44 sm:mb-8 sm:max-w-32"
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
            className={cn(
              'text-center text-5xl font-bold sm:mb-8',
              'max-sm:bg-card max-sm:mb-0 max-sm:w-full max-sm:bg-linear-to-b max-sm:from-green-500/10 max-sm:to-green-500/10 max-sm:py-8',
            )}>
            {t('title')}
          </motion.h1>
        </div>
        <div className="grid gap-0 sm:gap-8 xl:grid-cols-4">
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
                  'grid grid-rows-[auto_auto_auto_auto_auto]',
                  'h-full bg-linear-to-b',
                  service.color,
                  'rounded-none transition-colors duration-500 ease-in-out sm:rounded-lg',
                  'has-[a:hover]:from-primary/10 has-[a:hover]:to-primary/20 dark:has-[a:hover]:from-accent/10 dark:has-[a:hover]:to-accent/20',
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
                    variant="ghost"
                    size="lg"
                    className={cn(
                      'text-lg font-semibold duration-500',
                      'hover:bg-primary/30 hover:text-inherit',
                      'dark:hover:bg-accent/60 dark:hover:text-accent-foreground',
                    )}>
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
