'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/shadcn/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ComponentProps, FC } from 'react';

export const ConsumersWhyChooseSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('BespokeWhyChooseSection');
  const richText = useGlossaryRichText();

  const reasons = [
    { title: 'features_uniqueness_title', description: 'features_uniqueness_description' },
    { title: 'features_scalability_title', description: 'features_scalability_description' },
    { title: 'features_ownership_title', description: 'features_ownership_description' },
    { title: 'features_performance_title', description: 'features_performance_description' },
    { title: 'features_security_title', description: 'features_security_description' },
    { title: 'features_support_title', description: 'features_support_description' },
  ] as const;

  const faqs = [
    { question: 'faq_ownership_question', answer: 'faq_ownership_answer' },
    { question: 'faq_hosting_question', answer: 'faq_hosting_answer' },
    { question: 'faq_updates_question', answer: 'faq_updates_answer' },
    { question: 'faq_content_editing_question', answer: 'faq_content_editing_answer' },
    { question: 'faq_design_question', answer: 'faq_design_answer' },
    { question: 'faq_performance_question', answer: 'faq_performance_answer' },
    { question: 'faq_mobile_accessibility_question', answer: 'faq_mobile_accessibility_answer' },
  ] as const;

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-8 sm:scroll-mt-16', className)}
      id="why-choose-consumers"
      {...props}>
      <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
      <p className="text-center text-balance">{t.rich('description', richText)}</p>
      <div className="grid gap-8 md:grid-cols-2">
        {reasons.map(reason => (
          <Card key={reason.title} className="border-accent dark:border-primary group bg-card/50 border-2">
            <CardHeader>
              <CardTitle className="md:group-odd:text-right">{t(reason.title)}</CardTitle>
            </CardHeader>
            <CardContent className="md:group-odd:text-right">{t.rich(reason.description, richText)}</CardContent>
          </Card>
        ))}
      </div>

      <Card className="scroll-mt-20" id="faq">
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
              <AccordionItem key={index} value={`faq-${index}`}>
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
