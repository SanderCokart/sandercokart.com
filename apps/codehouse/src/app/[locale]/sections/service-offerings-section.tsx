'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { FaCode, FaDatabase, FaGlobe } from 'react-icons/fa';

import Link from 'next/link';

export function ServiceOfferingsSection() {
  const t = useTranslations('home.services');
  const locale = useLocale();

  function formatPrice(locale: string, amount: number): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(amount);
  }

  const formattedPriceRange = (min: number, max: number): string => {
    return `${formatPrice(locale, min)} - ${formatPrice(locale, max)}`;
  };

  const services = [
    {
      icon: <FaGlobe className="h-16 w-16" />,
      title: t('bespoke-solutions.title'),
      description: t('bespoke-solutions.description'),
      features: [
        { name: t('bespoke-solutions.features.unique-visuals'), emoji: '🎨' },
        { name: t('bespoke-solutions.features.internationalization'), emoji: '🌍' },
        { name: t('bespoke-solutions.features.blazing-speed'), emoji: '⚡' },
        { name: t('bespoke-solutions.features.hosting-included'), emoji: '🏠' },
        { name: t('bespoke-solutions.features.responsive-design'), emoji: '📱' },
      ],
      color: 'from-green-500/10 to-green-500/20',
      iconColor: 'text-green-500',
      link: '/bespoke-solutions',
      callToAction: t('bespoke-solutions.call-to-action'),
      priceRange: { min: 3000, max: 10000 },
      priceLevel: '💲',
    },
    {
      icon: <FaDatabase className="h-16 w-16" />,
      title: t('web-application-development.title'),
      description: t('web-application-development.description'),
      features: [
        { name: t('web-application-development.features.custom-webapps'), emoji: '🌐' },
        { name: t('web-application-development.features.database-storage'), emoji: '💾' },
        { name: t('web-application-development.features.secure-api'), emoji: '🛡️' },
        { name: t('web-application-development.features.scalable-cloud'), emoji: '📊' },
        { name: t('web-application-development.features.security-implementation'), emoji: '📡' },
      ],
      color: 'from-purple-500/10 to-purple-500/20',
      iconColor: 'text-purple-500',
      link: '/web-application-development',
      callToAction: t('web-application-development.call-to-action'),
      priceRange: { min: 5000, max: 20000 },
      priceLevel: '💲💲',
    },
    {
      icon: <FaCode className="h-16 w-16" />,
      title: t('freelance.title'),
      description: t('freelance.description'),
      features: [
        { name: t('freelance.features.client-side-apps'), emoji: '💻' },
        { name: t('freelance.features.nextjs-solution'), emoji: '✨' },
        { name: t('freelance.features.agile-git'), emoji: '🏃' },
        { name: t('freelance.features.laravel-apis'), emoji: '🔗' },
        { name: t('freelance.features.fast-integration'), emoji: '🔄' },
      ],
      color: 'from-blue-500/10 to-blue-500/20',
      iconColor: 'text-blue-500',
      link: '/freelance',
      callToAction: t('freelance.call-to-action'),
      priceRange: { min: 1000, max: 5000 },
      priceLevel: '💲💲💲',
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
        <div className="grid sm:gap-8 xl:grid-cols-3 xl:grid-rows-[auto_auto_auto_auto]">
          {services.map(service => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="row-span-5 grid grid-rows-subgrid">
              <Card
                className={cn(
                  'transition-transform xl:scale-95 xl:hover:scale-100',
                  'row-span-4 grid grid-rows-subgrid',
                  'h-full bg-gradient-to-b',
                  service.color,
                  'rounded-none sm:rounded-lg',
                )}>
                <CardHeader className="grid grid-rows-subgrid">
                  <div className={`flex items-center justify-center ${service.iconColor}`}>{service.icon}</div>
                  <p className="text-center text-2xl mt-2 font-semibold">{service.priceLevel}</p>
                  <h2 className="text-center text-3xl font-bold">{service.title}</h2>
                </CardHeader>
                <CardContent className="row-span-2 grid grid-rows-subgrid justify-center text-balance">
                  <p className="text-balance text-center text-lg">{service.description}</p>
                  <ul className="divide-foreground/50 divide-y-1 text-center">
                    {service.features.map(feature => (
                      <li className="px-2 py-2 text-xs" key={feature.name}>
                        {feature.emoji} {feature.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="grid grid-rows-subgrid place-items-center">
                  <Button asChild>
                    <Link href={service.link}>{service.callToAction}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </article>
    </section>
  );
}
