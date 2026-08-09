'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/shadcn/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

const faqs = [
  { question: 'faq_start_small_question', answer: 'faq_start_small_answer' },
  { question: 'faq_ownership_question', answer: 'faq_ownership_answer' },
  { question: 'faq_security_question', answer: 'faq_security_answer' },
  { question: 'faq_integrations_question', answer: 'faq_integrations_answer' },
  { question: 'faq_timeline_question', answer: 'faq_timeline_answer' },
  { question: 'faq_support_question', answer: 'faq_support_answer' },
  { question: 'faq_growth_question', answer: 'faq_growth_answer' },
] as const;

export const CommercialFaqSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('CommercialFaq');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('flex scroll-mt-20 flex-col gap-8', className)} id="faq" {...props}>
      <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="text-center text-balance">{t.rich('description', richText)}</p>

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
                  <span className="flex-1">{t.rich(faq.question, richText)}</span>
                </AccordionTrigger>
                <AccordionContent>{t.rich(faq.answer, richText)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};
