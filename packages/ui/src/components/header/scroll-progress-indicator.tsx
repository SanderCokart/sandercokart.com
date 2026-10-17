'use client';

import { cn } from '@repo/ui/lib/utils';
import { motion, useScroll } from 'motion/react';

/**
 * Reading progress along the bottom of the header. Its color is the theme accent unless a page sets
 * `--scroll-progress` on the root (the Codehouse home page uses the color of the section in view).
 */
export function ScrollProgressIndicator({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={cn('h-1 w-full bg-(--scroll-progress,var(--accent)) transition-colors duration-500', className)}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
