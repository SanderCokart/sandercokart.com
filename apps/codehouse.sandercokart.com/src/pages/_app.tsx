import 'swiper/scss';
import 'swiper/scss/pagination';
import '../styles/globals.css';

import { appWithTranslation } from 'next-i18next';

import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import type { AppProps } from 'next/app';

// import { Header } from '@/components/header';

import { cn } from '@/lib/utils';

const fontLetsGoDigital = localFont({
  src: '../fonts/LetsGoDigital.ttf',
  variable: '--fontLetsGoDigital',
  weight: '400',
  style: 'normal',
  preload: true,
});

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontRobotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={cn(
        fontLetsGoDigital.variable,
        fontInter.variable,
        fontRobotoMono.variable,
        'flex min-h-dvh flex-col font-sans',
      )}>
      {/*<Header />*/}
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);
