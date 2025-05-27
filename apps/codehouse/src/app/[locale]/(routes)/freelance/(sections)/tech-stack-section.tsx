'use client';

import { Card, CardHeader } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { FaLaravel, FaReact, FaVuejs } from 'react-icons/fa6';
import { TbBrandNextjs } from 'react-icons/tb';

import { ComponentProps, FC } from 'react';

export const TechStackSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('freelance-page.tech-stack');

  const techData = [
    {
      name: 'React',
      icon: <FaReact className="text-react h-32 w-32" />,
      color: 'react',
      gradient: 'from-react/10 to-react/20',
      translation: t('react'),
      viewportMargin: '-45%',
    },
    {
      name: 'Vue',
      icon: <FaVuejs className="text-vue h-32 w-32" />,
      color: 'vue',
      gradient: 'from-vue/10 to-vue/20',
      translation: t('vue'),
      viewportMargin: '-45%',
    },
    {
      name: 'Laravel',
      icon: <FaLaravel className="text-laravel h-32 w-32" />,
      color: 'laravel',
      gradient: 'from-laravel/10 to-laravel/20',
      translation: t('laravel'),
      viewportMargin: '-49%',
    },
    {
      name: 'NextJS',
      icon: <TbBrandNextjs className="text-next h-32 w-32" />,
      color: 'next',
      gradient: 'from-white/10 to-white/20',
      translation: t('next'),
      viewportMargin: '-45%',
      textClass: 'text-black dark:text-white',
    },
  ];

  return (
    <section className={cn('scroll-mt-16 sm:scroll-mt-16', className)} id="techstack" {...props}>
      <article>
        <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
        <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-4">
          {techData.map(stack => (
            <Card
              key={stack.name}
              className={`${stack.gradient} bg-gradient-to-b transition-transform md:hover:scale-105`}>
              <CardHeader className="flex flex-col items-center gap-4">
                {stack.icon}
                <h2 className="text-3xl font-bold">{stack.name}</h2>
                <p className="text-center md:text-lg">{stack.translation}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </article>
    </section>
  );
};
