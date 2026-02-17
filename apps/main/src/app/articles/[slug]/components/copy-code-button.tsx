'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Copy } from 'lucide-react';
import { useClipboard } from 'react-haiku';

import type { ComponentProps } from 'react';

const MotionButton = motion.create(Button);
const MotionCheckCircle = motion.create(CheckCircle);

export function CopyCodeButton({ copyValue, ...props }: ComponentProps<typeof MotionButton> & { copyValue?: string }) {
  const clipboard = useClipboard({ timeout: 2000 });

  function copyToClipboard() {
    console.log('copying to clipboard');
    if (copyValue) clipboard.copy(copyValue);
  }

  const copyVariants = {
    hidden: { opacity: 0, transition: { duration: 0.1 } },
    visible: { opacity: 1, transition: { duration: 0.1 } },
  };

  const checkCircleVariants = {
    hidden: { opacity: 0, scale: 0, transition: { duration: 0.1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {clipboard.copied ? (
        <MotionCheckCircle
          key="check"
          variants={checkCircleVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute right-10 top-2 size-6 text-green-400"
        />
      ) : (
        <MotionButton
          key="copy"
          variant="ghost"
          size="icon"
          variants={copyVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute right-10 top-2 size-6 disabled:opacity-100"
          onClick={copyToClipboard}
          {...props}>
          <Copy className="size-4" />
        </MotionButton>
      )}
    </AnimatePresence>
  );
}
