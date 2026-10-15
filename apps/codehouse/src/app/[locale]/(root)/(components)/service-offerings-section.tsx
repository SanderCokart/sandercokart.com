'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardHeader } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { motion, MotionConfig } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FaCode, FaDatabase, FaGithub, FaGlobe } from 'react-icons/fa';

import Image from 'next/image';

import type { Variants } from 'motion/react';

import logoMark from '@/app/[locale]/images/sc-logo.png';
import { Link } from '@/i18n/navigation';
import { serviceHrefs } from '@/lib/nav-links';

const MotionImage = motion.create(Image);

/**
 * Painted surfaces (the heading band and the card shells) never animate: on mobile they stack edge to edge,
 * so fading or sliding a shell opens a hole onto the page background. Only the content on top of them moves.
 */
const intro: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const logoIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/** Orchestrates a card's content only; the shell itself has no hidden state. */
const cardContent: Variants = {
  hidden: {},
  show: (index: number) => ({ transition: { delayChildren: 0.25 + index * 0.08, staggerChildren: 0.08 } }),
};

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
    <MotionConfig reducedMotion="user">
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
          <motion.div className="flex flex-col items-center" variants={intro} initial="hidden" animate="show">
            <MotionImage
              priority
              alt="Sander's CodeHouse"
              src={logoMark}
              variants={logoIn}
              className="mx-auto mb-4 h-auto max-w-44 sm:mb-8 sm:max-w-32"
            />
            <h1
              className={cn(
                'text-center text-5xl font-bold sm:mb-8',
                'max-sm:bg-card max-sm:mb-0 max-sm:w-full max-sm:bg-linear-to-b max-sm:from-green-500/10 max-sm:to-green-500/10 max-sm:py-8',
              )}>
              <motion.span variants={fadeUp} className="block">
                {t('title')}
              </motion.span>
            </h1>
          </motion.div>
          <div className="grid gap-0 sm:gap-8 xl:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                custom={index}
                variants={cardContent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="relative overflow-hidden">
                <Card
                  className={cn(
                    'grid grid-rows-[auto_auto_auto_auto_auto]',
                    'h-full bg-linear-to-b',
                    service.color,
                    'rounded-none transition-colors duration-500 ease-in-out sm:rounded-lg',
                    'has-[a:hover]:from-primary/10 has-[a:hover]:to-primary/20 dark:has-[a:hover]:from-accent/10 dark:has-[a:hover]:to-accent/20',
                  )}>
                  <CardHeader className="grid grid-rows-subgrid">
                    <motion.div
                      aria-hidden
                      variants={fadeUp}
                      className={`flex items-center justify-center ${service.iconColor}`}>
                      {service.icon}
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="mt-4 text-center text-3xl font-bold">
                      {service.title}
                    </motion.h2>
                  </CardHeader>
                  <CardContent className="row-span-2 grid grid-rows-subgrid">
                    <motion.p variants={fadeUp} className="mt-2 text-center text-lg">
                      {service.description}
                    </motion.p>
                    <motion.ul variants={fadeUp} className="space-y-2">
                      {service.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2">
                          <span aria-hidden className="dark:text-accent text-primary">
                            •
                          </span>
                          {feature}
                        </li>
                      ))}
                    </motion.ul>
                  </CardContent>
                  <motion.div variants={fadeUp} className="flex items-center justify-center p-4">
                    <Button
                      variant="ghost"
                      size="lg"
                      nativeButton={false}
                      render={<Link href={service.link} />}
                      className={cn(
                        'text-lg font-semibold duration-500',
                        'hover:bg-primary/30 hover:text-inherit',
                        'dark:hover:bg-accent/60 dark:hover:text-accent-foreground',
                      )}>
                      {t('callToAction')}
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </article>
      </section>
    </MotionConfig>
  );
}
