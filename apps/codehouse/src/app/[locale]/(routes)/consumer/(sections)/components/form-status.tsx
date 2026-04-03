'use client';

import { processRateLimitResponse } from '@repo/toolbox/rate-limit';
import { AlertDialog, AlertDialogContent } from '@repo/ui/components/shadcn/alert-dialog';
import { LucideAlertCircle, LucideCheckCircle2, LucideLoaderCircle, LucideXCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import type { FieldValues, UseFormReturn } from 'react-hook-form';

/** Always show the submitting state for this long after the HTTP response returns, before revealing the outcome. */
const SUBMITTING_PHASE_MS = 1000;

/**
 * How long the outcome UI stays visible after the submitting phase (easy to extend per status code).
 * Unknown status codes use `default`.
 */
const OUTCOME_VISIBLE_MS = {
  429: 4000,
  500: 4000,
  default: 1000,
} as const;

function getOutcomeVisibleMs(httpStatus: number): number {
  return OUTCOME_VISIBLE_MS[httpStatus as keyof typeof OUTCOME_VISIBLE_MS] ?? OUTCOME_VISIBLE_MS.default;
}

type FormStatusType = 'submitting' | 'submitted' | 'ratelimit' | 'error';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  lastResponse: Response | null;
};

export function FormStatus<T extends FieldValues>({ form, lastResponse }: Props<T>) {
  const tFormMessages = useTranslations('formMessages');

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<FormStatusType>('submitting');

  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (isSubmitting) {
      setOpen(true);
      setStatus('submitting');
      return;
    }

    if (!lastResponse) {
      return;
    }

    const httpStatus = lastResponse.status;

    const revealTimer = setTimeout(() => {
      if (httpStatus === 204) {
        setStatus('submitted');
      } else if (httpStatus === 429) {
        setStatus('ratelimit');
      } else if (httpStatus === 500) {
        setStatus('error');
      } else {
        setStatus('submitting');
      }
    }, SUBMITTING_PHASE_MS);

    const closeAfterMs = SUBMITTING_PHASE_MS + getOutcomeVisibleMs(httpStatus);
    const closeTimer = setTimeout(() => {
      setOpen(false);
    }, closeAfterMs);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(closeTimer);
    };
  }, [lastResponse, isSubmitting]);

  function getTitle(): string {
    return tFormMessages(`${status}_title`);
  }

  function getSubtitle(): string {
    let payload;
    if (status === 'ratelimit') {
      const { cooldownInMinutes, remainingRequests, requestLimit } = processRateLimitResponse(lastResponse!);
      payload = { limit: requestLimit, minutes: cooldownInMinutes };
    }

    return tFormMessages(`${status}_subtitle`, payload);
  }

  function getIcon() {
    const animation = {
      animate: 'animate',
      exit: 'exit',
      initial: 'initial',
      variants: {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
        },
      },
    };

    switch (status) {
      case 'submitting':
        return (
          <motion.span key="submitting" {...animation}>
            <LucideLoaderCircle className="size-10 animate-spin" />
          </motion.span>
        );
      case 'submitted':
        return (
          <motion.span key="submitted" {...animation}>
            <LucideCheckCircle2 className="text-accent size-10" />
          </motion.span>
        );
      case 'ratelimit':
        return (
          <motion.span key="ratelimit" {...animation}>
            <LucideAlertCircle className="text-destructive size-10" />
          </motion.span>
        );
      case 'error':
        return (
          <motion.span key="error" {...animation}>
            <LucideXCircle className="text-destructive size-10" />
          </motion.span>
        );
    }
  }

  function resetStatus(open: boolean) {
    if (!open) setStatus('submitting');
  }

  return (
    <AlertDialog open={open} onOpenChangeComplete={resetStatus}>
      <AlertDialogContent className="size-80">
        <div className="bg-red-blue flex flex-col gap-2">
          <div className="grid flex-1 place-items-center">
            <h1 className="text-center text-2xl font-bold">{getTitle()}</h1>
          </div>
          <div className="grid flex-1 place-items-center">
            <AnimatePresence mode="wait">{getIcon()}</AnimatePresence>
          </div>
          <div className="grid flex-1 place-items-center">
            <p className="text-muted-foreground text-center text-sm text-balance">{getSubtitle()}</p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
