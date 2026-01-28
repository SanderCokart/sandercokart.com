import { cn } from '@repo/ui/lib/utils';
import {
  AccessibilityIcon,
  GlobeIcon,
  PaintbrushIcon,
  RefreshCcwDotIcon,
  ServerIcon,
  SettingsIcon,
  TabletSmartphoneIcon,
  ZapIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMemo } from 'react';
import Image from 'next/image';

import type { ReactNode } from 'react';

import LogoINV from '@/public/static/images/logo/Logo-INV.png';
import Logo from '@/public/static/images/logo/Logo.png';

import { MotionLi, MotionUl } from '@/src/lib/motion';

import { FeatureProps, ServiceFeature } from '../(components)/service-feature';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const reverseContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function ConsumersHeroSection() {
  const t = useTranslations('BespokeHeroSection');

  const service_features: FeatureProps[] = useMemo(
    () => [
      {
        icon: ZapIcon,
        label: t('features_performant_label'),
        description: t.rich('features_performant_description', {
          highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
        }),
      },
      {
        icon: ServerIcon,
        label: t('features_hosting_label'),
        description: t.rich('features_hosting_description', {
          highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
        }),
      },
      {
        icon: GlobeIcon,
        label: t('features_internationalization_label'),
        description: t.rich('features_internationalization_description', {
          highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
        }),
      },
      {
        icon: TabletSmartphoneIcon,
        label: t('features_mobileFriendly_label'),
        description: t.rich('features_mobileFriendly_description', {
          highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
        }),
      },
      {
        icon: PaintbrushIcon,
        label: t('features_uniqueDesign_label'),
        description: t.rich('features_uniqueDesign_description', {
          highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
        }),
      },
      {
        icon: RefreshCcwDotIcon,
        label: t('features_iterativeDevelopment_label'),
        description: t.rich('features_iterativeDevelopment_description', {
          highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
        }),
      },
      {
        icon: SettingsIcon,
        label: t('features_customizable_label'),
        description: t.rich('features_customizable_description', {
          highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
        }),
      },
      {
        icon: AccessibilityIcon,
        label: t('features_accessible_label'),
        description: t.rich('features_accessible_description', {
          highlight: chunks => <strong className="dark:text-accent text-primary">{chunks}</strong>,
        }),
      },
    ],
    [t],
  );

  return (
    <section
      className={cn(
        'dark:drop-shadow-[0_0px_10px_hsl(var(--primary))]',
        'min-h-[calc(100dvh-theme(spacing.11))] sm:min-h-[calc(100dvh-theme(spacing.16))]',
        'container grid place-items-center',
      )}
      id="hero">
      <article className="flex flex-col gap-8">
        <Image priority alt="Logo" className="tw-w-full mx-auto block sm:w-1/5 dark:hidden" src={LogoINV} />
        <Image priority alt="Logo" className="tw-w-full mx-auto hidden sm:w-1/5 dark:block" src={Logo} />

        <h2 className="text-balance text-center text-3xl font-bold uppercase sm:text-5xl">
          {t.rich('title', {
            highlight: chunks => <span className="text-accent">{chunks}</span>,
          })}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {/* First 4 features with staggerDirection: 1 */}
          <MotionUl className="contents" variants={container} initial="hidden" animate="show">
            {service_features.slice(0, 4).map((feature, idx) => (
              <MotionLi
                key={`first-${feature.label}`}
                variants={item}
                className="group transition-transform hover:scale-105">
                <ServiceFeature
                  className={cn(
                    'h-full w-full',
                    // Default: primary, On hover: accent
                    'bg-primary/10 border-primary',
                    'group-hover:bg-accent/10 group-hover:border-accent transition-colors',
                  )}
                  feature={feature}
                />
              </MotionLi>
            ))}
          </MotionUl>
          {/* Last 4 features with staggerDirection: -1 */}
          <MotionUl className="contents" variants={reverseContainer} initial="hidden" animate="show">
            {service_features.slice(-4).map((feature, idx) => (
              <MotionLi
                key={`last-${feature.label}`}
                variants={item}
                className="group transition-transform hover:scale-105">
                <ServiceFeature
                  className={cn(
                    'h-full w-full',
                    // Default: primary, On hover: accent
                    'bg-primary/10 border-primary',
                    'group-hover:bg-accent/10 group-hover:border-accent transition-colors',
                  )}
                  feature={feature}
                />
              </MotionLi>
            ))}
          </MotionUl>
        </div>
      </article>
    </section>
  );
}
