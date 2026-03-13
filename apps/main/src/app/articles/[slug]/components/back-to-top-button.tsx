'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { ArrowUp } from 'lucide-react';
import { motion, MotionProps, useScroll, useTransform } from 'motion/react';

import * as React from 'react';

export default function BackToTopButton({ className, ...props }: React.ComponentProps<typeof Button> & MotionProps) {
  const MotionButton = motion.create(Button);

  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [10, 0]);

  return (
    <MotionButton
      {...props}
      style={{ opacity, y }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      size="icon"
      className={cn('size-10', className)}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowUp />
    </MotionButton>
  );
}