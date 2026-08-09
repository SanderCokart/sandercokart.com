'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/shadcn/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

const faqs = [
  { question: 'faq_hours_question', answer: 'faq_hours_answer' },
  { question: 'faq_timezone_question', answer: 'faq_timezone_answer' },
  { question: 'faq_tools_question', answer: 'faq_tools_answer' },
  { question: 'faq_ownership_question', answer: 'faq_ownership_answer' },
  { question: 'faq_sprint_question', answer: 'faq_sprint_answer' },
  { question: 'faq_notice_question', answer: 'faq_notice_answer' },
  { question: 'faq_remote_question', answer: 'faq_remote_answer' },
] as const;

export const FreelanceFaqSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceFaq');
  const richText = useGlossaryRichText();

  return (
    <section
      className={cn('container flex scroll-mt-20 flex-col gap-8', className)}
      id="faq"
      {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">
          {t.rich('description', richText)}
        </p>
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
