'use client';

import { cn } from '@repo/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { LucideCheckCircle2, LucideLoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<any>;
};

export const FormStatus: FC<Props> = ({ form }) => {
  const [keepOpen, setKeepOpen] = useState(false);
  const t = useTranslations('FormStatus');

  /**
   * This useEffect hook triggers when the form submission is successful.
   * It resets the form after a 2-second delay.
   */
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) setTimeout(() => form.reset(), 2000);
  }, [form.formState.isSubmitSuccessful]);

  /**
   * This useEffect hook triggers when the `keepOpen` state is true.
   * It sets `keepOpen` to false after a 2-second delay, which will hide the status.
   */
  useEffect(() => {
    if (keepOpen) setTimeout(() => setKeepOpen(false), 2000);
  }, [keepOpen]);

  /**
   * This useEffect hook triggers when the form is submitted and valid.
   * It sets the `keepOpen` state to true, ensuring the status message remains visible for a set duration.
   */
  useEffect(() => {
    if (form.formState.isSubmitted && form.formState.isValid) setKeepOpen(true);
  }, [form.formState.isSubmitted]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 mx-auto grid max-w-screen-md place-items-center md:inset-1/4">
      <AnimatePresence>
        {(form.formState.isSubmitting || form.formState.isSubmitSuccessful || keepOpen) && (
          <motion.div
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0, width: '100%', height: '100%' }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'bg-muted border-primary grid place-items-center rounded-md border transition-colors',
              form.formState.isSubmitting && 'border-primary',
              form.formState.isSubmitSuccessful && 'border-accent',
              !form.formState.isSubmitSuccessful && keepOpen && 'border-destructive',
            )}>
            <div className="grid place-items-center gap-2">
              {form.formState.isSubmitSuccessful ? (
                <>
                  <LucideCheckCircle2 className="h-20 w-20" />
                  <h3 className="text-2xl font-bold">{t('submitted')}</h3>
                </>
              ) : (
                <>
                  <LucideLoaderCircle className="h-20 w-20 animate-spin" />
                  <h3 className="text-2xl font-bold">{t('submitting')}</h3>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
