import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';

import Image from 'next/image';
import Link from 'next/link';

import logoMark from '@/app/images/sc-logo.png';

import { Navigation } from './navigation';

export function Header() {
  return (
    <BrandHeader
      namedLogo={
        <NamedLogo
          href="/"
          Component={Link}
          name="sandercokart.com"
          slogan="Let's learn..."
          logo={<Image src={logoMark} alt="" className="h-8 w-auto shrink-0 sm:h-10" priority />}
        />
      }
      navigation={<Navigation />}
    />
  );
}
