import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';

import { LocaleSwitcher } from '@/src/components/locale-switcher';
import { Link } from '@/src/i18n/navigation';

import { NavigationHeader } from './navigation-header';

export function Header() {
  return (
    <BrandHeader
      localeSwitcher={<LocaleSwitcher />}
      navigation={<NavigationHeader />}
      namedLogo={
        <Link href="/">
          <NamedLogo name="Sander's Codehouse" slogan="Let's code..." />
        </Link>
      }
    />
  );
}
