import { FaCode, FaDatabase, FaGithub, FaGlobe } from 'react-icons/fa';

import type { ServiceId } from '@/lib/nav-links';
import type { Messages } from 'next-intl';
import type { IconType } from 'react-icons';

type CopyKey = keyof Messages['ServiceOfferingsSection'];

export type ServiceOffering = {
  id: ServiceId;
  icon: IconType;
  /** Sets `--band`, the accent the band paint and icon read. Written as a class so Tailwind emits the color token. */
  band: string;
  title: CopyKey;
  description: CopyKey;
  features: readonly CopyKey[];
};

export const serviceOfferings = [
  {
    id: 'consumer',
    icon: FaGlobe,
    band: '[--band:var(--color-green-500)]',
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
    band: '[--band:var(--color-blue-500)]',
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
    band: '[--band:var(--color-purple-500)]',
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
    band: '[--band:var(--color-orange-500)]',
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
