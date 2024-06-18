import { Header as BrandHeader } from '@repo/ui/brand/header';
import { NamedLogo } from '@repo/ui/brand/named-logo';

import Link from 'next/link';

import { Navigation } from './navigation';

export function Header() {
  return (
    <BrandHeader
      namedLogo={
        <Link href="/">
          <NamedLogo name="sandercokart.com" slogan="Let's learn..." />
        </Link>
      }
      navigation={<Navigation />}
    />
  );
}
