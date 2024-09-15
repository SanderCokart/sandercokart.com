import type { Variants } from 'framer-motion';

export type AnimationType = {
  initial: string;
  animate: string;
  exit: string;

  variants: Variants;
};

export type Locales = 'en' | 'nl';
