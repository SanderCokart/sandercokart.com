'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const MotionButton = motion.create(Button);

  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [10, 0]);

  return (
    <MotionButton
      style={{ opacity, y }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      variant="outline"
      size="icon"
      className={cn('fixed bottom-4 right-4 z-50')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowUp />
    </MotionButton>
  );
}
