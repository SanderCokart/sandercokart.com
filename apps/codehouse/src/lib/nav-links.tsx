import { FaHouseUser, FaLaptopCode, FaOsi, FaStore } from 'react-icons/fa';
import { FaCircleQuestion, FaEnvelope } from 'react-icons/fa6';

import type { ReactNode } from 'react';
import type { Messages } from 'next-intl';

type NavigationTranslationKey = Extract<keyof Messages['common'], `navigation_${string}`>;

export type LinkType = {
  href: string;
  icon: ReactNode;
  t: NavigationTranslationKey;
};

export const links = [
  {
    href: '#faq',
    icon: <FaCircleQuestion />,
    t: 'navigation_faq',
  },
  {
    href: '#ask-for-a-quote',
    icon: <FaEnvelope />,
    t: 'navigation_ask-for-a-quote',
  },
] as const satisfies readonly LinkType[];

export type ServiceId = 'consumer' | 'commercial' | 'freelance' | 'open-source';

export const serviceHrefs = {
  'consumer': '/consumer',
  'commercial': '/commercial',
  'freelance': '/freelance',
  'open-source': '/open-source',
} as const satisfies Record<ServiceId, string>;

export const serviceLinks = [
  {
    href: serviceHrefs.consumer,
    icon: <FaHouseUser />,
    t: 'navigation_consumer',
  },
  {
    href: serviceHrefs.commercial,
    icon: <FaStore />,
    t: 'navigation_commercial',
  },
  {
    href: serviceHrefs.freelance,
    icon: <FaLaptopCode />,
    t: 'navigation_freelance',
  },
  {
    href: serviceHrefs['open-source'],
    icon: <FaOsi />,
    t: 'navigation_open-source',
  },
] as const satisfies readonly LinkType[];
