import { FaEnvelope, FaCircleQuestion } from 'react-icons/fa6';

import type { ReactNode } from 'react';

export type LinkType = {
  href: string;
  icon: ReactNode;
  t: string;
};

export const links = [
  {
    href: '#faq',
    icon: <FaCircleQuestion />,
    t: 'faq',
  },
  {
    href: '#ask-for-a-quote',
    icon: <FaEnvelope />,
    t: 'ask-for-a-quote',
  },
] as const;
