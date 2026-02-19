'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { CheckCircle, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useClipboard } from 'react-haiku';

import type { ComponentProps, FC } from 'react';
import type { MotionProps } from 'motion/react';

const MotionCheckCircle = motion.create(CheckCircle);
const MotionButton = motion.create(Button);

type CopyCodeButtonProps = {
  copyValue?: string;
} & ComponentProps<typeof Button> &
  MotionProps;

export const CopyCodeButton: FC<CopyCodeButtonProps> = ({ copyValue, ...props }) => {
  const clipboard = useClipboard({ timeout: 2000 });

  function copyToClipboard() {
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
          variants={copyVariants}
          variant="ghost"
          size="icon"
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn('absolute right-10 top-2 size-6 disabled:opacity-100')}
          onClick={copyToClipboard}
          {...props}>
          <Copy className="size-4" />
        </MotionButton>
      )}
    </AnimatePresence>
  );
};
