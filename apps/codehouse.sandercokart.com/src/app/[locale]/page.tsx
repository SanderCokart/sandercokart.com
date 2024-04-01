import { Hero } from './components/hero';

export default async function LandingPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <Hero />
    </>
  );
}

export const generateStaticParams = async () => {
  return [{ params: { locale: 'nl' } }, { params: { locale: 'en' } }];
};
