import { Header as BrandHeader } from '@repo/ui/brand/header';
import { NamedLogo } from '@repo/ui/brand/named-logo';

import { Link } from '@/i18n/routing';

import { LocaleSwitcher } from './locale-switcher';
import { Navigation } from './navigation';

export function Header() {
  return (
    <BrandHeader
      localeSwitcher={<LocaleSwitcher />}
      namedLogo={
        <Link href="/">
          <NamedLogo name="Sander's Codehouse" slogan="Let's code..." />
        </Link>
      }
      navigation={<Navigation />}
    />
  );
}
