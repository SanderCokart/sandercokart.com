'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/shadcn/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC, ReactNode } from 'react';

const faqs = [
  { question: 'faq_license_question', answer: 'faq_license_answer' },
  { question: 'faq_download_question', answer: 'faq_download_answer' },
  { question: 'faq_contribute_question', answer: 'faq_contribute_answer' },
  { question: 'faq_support_question', answer: 'faq_support_answer' },
] as const;

export const OpenSourceFaqSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('OpenSourceFaq');

  return (
    <section className={cn('container flex scroll-mt-20 flex-col gap-8', className)} id="faq" {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">{t('description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <CircleQuestionMarkIcon className="stroke-primary dark:stroke-accent" />
              {t('faq_title')}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion multiple className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  <span className="flex-1">{t.rich(faq.question, highlightRichText)}</span>
                </AccordionTrigger>
                <AccordionContent>{t.rich(faq.answer, highlightRichText)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};

const highlightRichText = {
  highlight: (chunks: ReactNode) => <span className="text-accent font-medium">{chunks}</span>,
};
