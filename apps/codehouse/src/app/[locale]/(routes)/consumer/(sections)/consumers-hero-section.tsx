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
        'mt-16',
      )}
      id="hero">
      <article className="flex flex-col gap-8">
        <Image priority alt="Logo" className="tw-w-full max-w-xs mx-auto block sm:w-1/5 dark:hidden" src={LogoINV} />
        <Image priority alt="Logo" className="tw-w-full max-w-xs mx-auto hidden sm:w-1/5 dark:block" src={Logo} />

        <h2 className="text-balance text-center text-3xl max-w-6xl mx-auto font-bold uppercase sm:text-5xl">
          {t.rich('title', {
            highlight: chunks => <span className="text-accent">{chunks}</span>,
          })}
        </h2>
        
      </article>
    </section>
  );
}
