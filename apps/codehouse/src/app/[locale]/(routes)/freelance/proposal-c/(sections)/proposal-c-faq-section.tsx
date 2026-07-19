'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/shadcn/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ComponentProps, FC } from 'react';

import { MotionDiv } from '@/src/lib/motion';

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const faqs = [
  { question: 'faq_scope_question', answer: 'faq_scope_answer' },
  { question: 'faq_ownership_question', answer: 'faq_ownership_answer' },
  { question: 'faq_timeline_question', answer: 'faq_timeline_answer' },
  { question: 'faq_communication_question', answer: 'faq_communication_answer' },
  { question: 'faq_stack_question', answer: 'faq_stack_answer' },
  { question: 'faq_handoff_question', answer: 'faq_handoff_answer' },
] as const;

export const ProposalCFaqSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceProposalCFaqSection');
  const richText = useGlossaryRichText();

  return (
    <section className={cn('container max-w-screen-lg scroll-mt-16 py-4', className)} id="faq" {...props}>
      <MotionDiv
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}>
        <h2 className="mb-4 text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mb-8 text-center text-balance">{t.rich('description', richText)}</p>

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
      </MotionDiv>
    </section>
  );
};
