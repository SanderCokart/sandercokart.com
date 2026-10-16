import type { Variants } from 'motion/react';

/**
 * Hero entrance shared by the service pages: the SC mark powers on by itself (segment-logo.css), then the title,
 * description and calls to action rise in one after another. Put `heroStagger` with `initial="hidden"` and
 * `animate="show"` on the wrapper and `heroItem` on each part.
 */
export const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
