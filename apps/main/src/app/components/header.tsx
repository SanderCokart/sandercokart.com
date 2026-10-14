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
          logo={<Image src={logoMark} alt="" fill sizes="50px" className="object-contain" priority />}
        />
      }
      navigation={<Navigation />}
    />
  );
}
