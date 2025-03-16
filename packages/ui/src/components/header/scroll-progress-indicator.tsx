'use client';

import { cn } from '@repo/ui/lib/utils';
import { motion, useScroll } from 'framer-motion';

export function ScrollProgressIndicator({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();

  return <motion.div className={cn('bg-accent h-1 w-full', className)} style={{ scaleX: scrollYProgress }} />;
}
