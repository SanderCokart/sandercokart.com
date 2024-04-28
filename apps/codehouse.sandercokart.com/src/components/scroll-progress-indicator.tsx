import { motion, useScroll } from 'framer-motion';

import { cn } from '@/lib/utils';

export function ScrollProgressIndicator({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className={cn('bg-accent absolute -bottom-0 h-1 w-full', className)}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
