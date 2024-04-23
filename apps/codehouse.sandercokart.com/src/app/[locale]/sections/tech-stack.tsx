import { getTranslations } from 'next-intl/server';
import { FaLaravel, FaReact, FaVuejs } from 'react-icons/fa6';
import { TbBrandNextjs } from 'react-icons/tb';

export async function TechStack() {
  const t = await getTranslations('home.tech-stack');

  return (
    <section className="section" id="techstack">
      <article>
        <h1 className="mb-4 text-center text-5xl font-bold" id="portfolio">
          {t('title')}
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4 rounded bg-react/10 p-4">
              <FaReact className="h-32 w-32 text-react" />
              <h2 className="text-3xl font-bold">React</h2>
              <p className="text-center md:text-lg">{t('react')}</p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded bg-vue/10 p-4">
              <FaVuejs className="h-32 w-32 text-vue" />
              <h2 className="text-3xl font-bold">Vue</h2>
              <p className="text-center md:text-lg">{t('vue')}</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4 rounded bg-laravel/10 p-4">
              <FaLaravel className="h-32 w-32 text-laravel" />
              <h2 className="text-3xl font-bold">Laravel</h2>
              <p className="text-center md:text-lg">{t('laravel')}</p>
            </div>

            <div className="flex flex-col items-center gap-4 rounded bg-white/10 p-4">
              <TbBrandNextjs className="h-32 w-32 text-white" />
              <h2 className="text-3xl font-bold">NextJS</h2>
              <p className="text-center md:text-lg">{t('next')}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
