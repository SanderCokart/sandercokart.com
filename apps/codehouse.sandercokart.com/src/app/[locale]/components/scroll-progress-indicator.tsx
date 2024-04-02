'use client';

import { motion, useScroll } from 'framer-motion';

import { cn } from '@/lib/utils';

export function ScrollProgressIndicator({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();

  return <motion.div className={cn('h-1 w-full bg-accent', className)} style={{ scaleX: scrollYProgress }} />;
}
