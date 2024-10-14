'use client';

import { Card, CardHeader } from '@repo/ui/card';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaLaravel, FaReact, FaVuejs } from 'react-icons/fa6';
import { TbBrandNextjs } from 'react-icons/tb';

import { useEffect, useState } from 'react';

export function TechStackSection() {
  const t = useTranslations('home.tech-stack');
  const [initialOpacity, setInitialOpacity] = useState(1);

  useEffect(() => {
    setInitialOpacity(0.25);
  }, []);

  return (
    <section className="scroll-mt-16 sm:scroll-mt-16" id="techstack">
      <article>
        <h1 className="mb-4 text-center text-5xl font-bold">{t('title')}</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <motion.div
              style={{ opacity: initialOpacity }}
              viewport={{ margin: '-45%', once: true }}
              whileInView={{ opacity: 1 }}>
              <Card
                className="from-react/10 to-react/20 bg-gradient-to-b transition-transform md:hover:scale-105"
                tabIndex={0}>
                <CardHeader className="flex flex-col items-center gap-4">
                  <FaReact className="text-react h-32 w-32" />
                  <h2 className="text-3xl font-bold">React</h2>
                  <p className="text-center md:text-lg">{t('react')}</p>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              style={{ opacity: initialOpacity }}
              viewport={{ margin: '-45%', once: true }}
              whileInView={{ opacity: 1 }}>
              <Card
                className="from-vue/10 to-vue/20 bg-gradient-to-b transition-transform md:hover:scale-105"
                tabIndex={0}>
                <CardHeader className="flex flex-col items-center gap-4">
                  <FaVuejs className="text-vue h-32 w-32" />
                  <h2 className="text-3xl font-bold">Vue</h2>
                  <p className="text-center md:text-lg">{t('vue')}</p>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
          <div className="flex flex-col gap-8">
            <motion.div
              style={{ opacity: initialOpacity }}
              viewport={{ margin: '-49%', once: true }}
              whileInView={{ opacity: 1 }}>
              <Card
                className="from-laravel/10 to-laravel/20 bg-gradient-to-b transition-transform md:hover:scale-105"
                tabIndex={0}>
                <CardHeader className="flex flex-col items-center gap-4">
                  <FaLaravel className="text-laravel h-32 w-32" />
                  <h2 className="text-3xl font-bold">Laravel</h2>
                  <p className="text-center md:text-lg">{t('laravel')}</p>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              style={{ opacity: initialOpacity }}
              viewport={{ margin: '-45%', once: true }}
              whileInView={{ opacity: 1 }}>
              <Card className="bg-gradient-to-b from-white/10 to-white/20 transition-transform" tabIndex={0}>
                <CardHeader className="flex flex-col items-center gap-4">
                  <TbBrandNextjs className="h-32 w-32 text-black dark:text-white" />
                  <h2 className="text-3xl font-bold">NextJS</h2>
                  <p className="text-center md:text-lg">{t('next')}</p>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </article>
    </section>
  );
}
