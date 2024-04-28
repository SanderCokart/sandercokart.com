import { BsFillLightningFill } from 'react-icons/bs';
import { FaEnvelope } from 'react-icons/fa';
import { FaComment, FaSuitcase } from 'react-icons/fa6';

import type { ReactNode } from 'react';

{
  /*Icon={FaSuitcase}
Icon={BsFillLightningFill}
Icon={FaComment}
Icon={FaEnvelope}*/
}

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
    href: '/#contact',
    icon: <FaEnvelope />,
    t: 'contact',
  },
] as const;
