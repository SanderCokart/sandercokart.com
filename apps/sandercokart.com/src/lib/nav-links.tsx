import type { ReactNode } from 'react';

export type LinkType = {
  href: string;
  icon: ReactNode;
  text: string;
};

export const links: LinkType[] = [] as const;
