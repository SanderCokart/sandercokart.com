import { FaCode, FaDatabase, FaGithub, FaGlobe } from 'react-icons/fa';

import type { ServiceId } from '@/lib/nav-links';
import type { Messages } from 'next-intl';
import type { IconType } from 'react-icons';

type CopyKey = keyof Messages['ServiceOfferingsSection'];
type LabelKey = Extract<keyof Messages['common'], `navigation_${string}`>;

export type ServiceOffering = {
  id: ServiceId;
  icon: IconType;
  /** Channel accent. One family: equal lightness and chroma, only the hue changes (emerald and violet echo the logo). */
  accent: string;
  /** Short name from the site navigation, used on the channel selector. */
  label: LabelKey;
  title: CopyKey;
  description: CopyKey;
  features: readonly CopyKey[];
};

export const serviceOfferings = [
  {
    id: 'consumer',
    icon: FaGlobe,
    accent: 'oklch(0.7 0.15 165)',
    label: 'navigation_consumer',
    title: 'marketing_title',
    description: 'marketing_description',
    features: [
      'marketing_features_design',
      'marketing_features_i18n',
      'marketing_features_performance',
      'marketing_features_mobile',
      'marketing_features_cms',
    ],
  },
  {
    id: 'commercial',
    icon: FaDatabase,
    accent: 'oklch(0.7 0.15 245)',
    label: 'navigation_commercial',
    title: 'custom_title',
    description: 'custom_description',
    features: [
      'custom_features_webapps',
      'custom_features_database',
      'custom_features_api',
      'custom_features_cloud',
      'custom_features_security',
    ],
  },
  {
    id: 'freelance',
    icon: FaCode,
    accent: 'oklch(0.7 0.15 300)',
    label: 'navigation_freelance',
    title: 'freelance_title',
    description: 'freelance_description',
    features: [
      'freelance_features_react',
      'freelance_features_fullstack',
      'freelance_features_agile',
      'freelance_features_team',
      'freelance_features_onboarding',
    ],
  },
  {
    id: 'open-source',
    icon: FaGithub,
    accent: 'oklch(0.7 0.15 55)',
    label: 'navigation_open-source',
    title: 'opensource_title',
    description: 'opensource_description',
    features: [
      'opensource_features_tools',
      'opensource_features_download',
      'opensource_features_versions',
      'opensource_features_licenses',
      'opensource_features_public',
    ],
  },
] as const satisfies readonly ServiceOffering[];
