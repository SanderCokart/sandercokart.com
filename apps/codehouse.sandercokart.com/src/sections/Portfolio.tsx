import { useTranslation } from 'next-i18next';
import { FaArrowLeft, FaArrowRight, FaGithub } from 'react-icons/fa';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { StaticImageData } from 'next/image';

import NawijzerAdmin from '@/public/static/images/portfolio/nawijzer-admin.png';
import NaWijzerQuestionnaire from '@/public/static/images/portfolio/nawijzer-questionnaire.png';

function Figure({ figure: { caption, image } }: { figure: { image: StaticImageData; caption: string } }) {
  return (
    <figure className="relative min-w-full snap-center">
      <Image
        alt={caption}
        className="pointer-events-none cursor-pointer transition-transform md:pointer-events-auto"
        height="540"
        src={image}
        width="960"
        onClick={() => {
          //open modal
        }}
      />
      <figcaption className="bg-primaryLight/75 dark:bg-primaryDark/75 absolute bottom-0 left-0 right-0 mx-auto overflow-clip rounded-t-full px-4 py-1 text-center text-xs font-bold text-black text-white md:w-min md:whitespace-nowrap md:px-8 md:py-2 md:text-base dark:text-white">
        {caption}
      </figcaption>
    </figure>
  );
}

interface ProjectProps {
  figures: { image: StaticImageData; caption: string }[];
  title: string;
  description: string;
}

function Project({ project: { title, figures, description } }: { project: ProjectProps }) {
  const paginationRef = useRef<HTMLDivElement>(null);

  return (
    <article className="min-w-full snap-center p-6">
      <h3 className="mb-4 text-2xl font-bold md:text-4xl">{title}</h3>
      <div className="relative">
        <Swiper
          mousewheel
          className="drop-shadow-primary"
          keyboard={{ onlyInViewport: true }}
          modules={[Keyboard, Mousewheel, Navigation, Pagination]}
          navigation={{ prevEl: '#previous-slide', nextEl: '#next-slide' }}
          pagination={{ el: paginationRef.current, clickable: true }}
          slidesPerView={1}>
          <button
            className="bg-primaryLight/50 enabled:hover:bg-primaryLight/75 dark:bg-primaryDark/50 absolute bottom-16 left-0 top-16 z-10 origin-left rounded-r-full p-2 text-xs text-white transition-all active:scale-95 disabled:bg-zinc-900/50 sm:text-base md:bottom-20 md:top-20 md:text-lg dark:disabled:bg-zinc-900/50"
            id="previous-slide"
            name="Previous image"
            type="button">
            <FaArrowLeft />
          </button>

          {figures.map(figure => (
            <SwiperSlide key={figure.image.src}>
              <Figure figure={figure} />
            </SwiperSlide>
          ))}

          <button
            className="bg-primaryLight/50 enabled:hover:bg-primaryLight/75 dark:bg-primaryDark/50 absolute bottom-16 right-0 top-16 z-10 z-20 origin-right rounded-l-full p-2 text-xs text-white transition-all active:scale-95 disabled:bg-zinc-900/50 sm:text-base md:bottom-20 md:top-20 md:text-lg dark:disabled:bg-zinc-900/50"
            id="next-slide"
            name="Next image"
            type="button">
            <FaArrowRight />
          </button>
        </Swiper>
        <div ref={paginationRef} className="mt-4 flex w-full justify-center gap-2"></div>
      </div>
      <p className="mt-6 text-base font-bold md:text-lg md:font-normal">{description}</p>
    </article>
  );
}

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <section className="section-no-height relative" id="portfolio">
      <h2 className="title">{t('nav:portfolio')}</h2>
      <Swiper
        className="static pb-16"
        modules={[Navigation]}
        navigation={{ nextEl: '#next-outer-slide', prevEl: '#previous-outer-slide' }}
        slidesPerView={1}>
        <button
          className="bg-primary enabled:hover:bg-primaryLight absolute bottom-8 left-6 rounded-r-lg py-2 pl-8 pr-4 text-center text-xs font-bold text-white transition-colors transition-transform [clip-path:polygon(15%_0,100%_0,100%_100%,15%_100%,0_50%)] enabled:active:scale-90 disabled:opacity-50 md:text-base"
          id="previous-outer-slide"
          type="button">
          {t('home:previous-project')}
        </button>
        <SwiperSlide>
          <Project
            project={{
              figures: [
                { image: NaWijzerQuestionnaire, caption: t('home:project.nawijzer.caption-1') },
                { image: NawijzerAdmin, caption: t('home:project.nawijzer.caption-2') },
              ],
              title: 'NaWijzer.nl',
              description: t('home:project.nawijzer.description'),
            }}
          />
        </SwiperSlide>
        <SwiperSlide className="h-auto">
          <article className="grid h-full min-w-full place-items-center p-6">
            <div className="grid h-[50%] place-items-center">
              <h3 className="mb-4 text-center text-2xl font-bold md:text-4xl">{t('home:more-on-github')}</h3>

              <Link
                className="hover:text-secondaryLight animate-bounce text-9xl transition-colors"
                href="https://github.com/stars/SanderCokart/lists/projects">
                <FaGithub />
              </Link>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>

      <button
        className="bg-primary enabled:hover:bg-primaryLight absolute bottom-8 right-6 rounded-l-lg py-2 pl-4 pr-8 text-center text-xs font-bold text-white transition-colors transition-transform [clip-path:polygon(85%_0%,100%_50%,85%_100%,0%_100%,0%_0%)] enabled:active:scale-90 disabled:opacity-50 md:text-base"
        id="next-outer-slide"
        type="button">
        {t('home:next-project')}
      </button>
    </section>
  );
};

export default Portfolio;
