import { BsFillLightningFill } from 'react-icons/bs';
import { FaEnvelope } from 'react-icons/fa';
import { FaComment, FaSuitcase } from 'react-icons/fa6';

import type { ReactNode } from 'react';

export type LinkType = {
  href: string;
  icon: ReactNode;
  t: string;
};

export const links = [
  {
    href: '/#portfolio',
    icon: <FaSuitcase />,
    t: 'portfolio',
  },
  {
    href: '/#techstack',
    icon: <BsFillLightningFill />,
    t: 'tech-stack',
  },
  {
    href: '/#testimonials',
    icon: <FaComment />,
    t: 'testimonials',
  },
  {
    href: '/#contact-form',
    icon: <FaEnvelope />,
    t: 'contact',
  },
] as const;
