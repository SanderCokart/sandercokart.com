'use client';

import { cn } from '@repo/ui/lib/utils';
import { LucideAlertCircle, LucideCheckCircle2, LucideLoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { useEffect } from 'react';

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export type RateLimitHint = {
  limit: number;
  remaining: number;
};

export type FormRootErrorKind = 'rate_limit' | 'generic';

type Props = {
  form: UseFormReturn<any>;
  rateLimitHint?: RateLimitHint | null;
  rootErrorKind?: FormRootErrorKind | null;
};

export const FormStatus: FC<Props> = ({ form, rateLimitHint, rootErrorKind }) => {
  const t = useTranslations('FormStatus');

  const rootError = form.formState.errors.root;
  const rootMessage = typeof rootError?.message === 'string' ? rootError.message : undefined;
  const showOverlay =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful || Boolean(rootMessage);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      const id = setTimeout(() => form.reset(), 2000);
      return () => clearTimeout(id);
    }
  }, [form.formState.isSubmitSuccessful, form]);

  useEffect(() => {
    if (!rootMessage) {
      return;
    }
    const id = setTimeout(() => form.clearErrors('root'), 6000);
    return () => clearTimeout(id);
  }, [rootMessage, form]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 mx-auto grid max-w-3xl place-items-center md:inset-1/4">
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0, width: '100%', height: '100%' }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'bg-muted border-primary pointer-events-none grid max-w-md place-items-center rounded-md border px-6 py-8 transition-colors',
              form.formState.isSubmitting && 'border-primary',
              form.formState.isSubmitSuccessful && 'border-accent',
              rootMessage && 'border-destructive',
            )}>
            <div className="grid place-items-center gap-2 text-center">
              {form.formState.isSubmitting ? (
                <>
                  <LucideLoaderCircle className="h-20 w-20 animate-spin" />
                  <h3 className="text-2xl font-bold">{t('submitting')}</h3>
                </>
              ) : form.formState.isSubmitSuccessful ? (
                <>
                  <LucideCheckCircle2 className="h-20 w-20" />
                  <h3 className="text-2xl font-bold">{t('submitted')}</h3>
                  {rateLimitHint ? (
                    <p className="text-muted-foreground text-sm">
                      {t('rate_limit_remaining', {
                        remaining: rateLimitHint.remaining,
                        limit: rateLimitHint.limit,
                      })}
                    </p>
                  ) : null}
                </>
              ) : rootMessage ? (
                <>
                  <LucideAlertCircle className="text-destructive h-20 w-20" />
                  <h3 className="text-destructive text-2xl font-bold">
                    {rootErrorKind === 'rate_limit' ? t('rate_limit_title') : t('submit_failed_title')}
                  </h3>
                  <p className="text-muted-foreground max-w-sm text-sm">{rootMessage}</p>
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
