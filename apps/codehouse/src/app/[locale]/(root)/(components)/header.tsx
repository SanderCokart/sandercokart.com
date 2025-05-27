import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';

import { Link } from '@/src/i18n/navigation';

import { LocaleSwitcher } from '@/src/components/locale-switcher';

export function Header() {
  return (
    <BrandHeader
      localeSwitcher={<LocaleSwitcher />}
      namedLogo={
        <Link href="/">
          <NamedLogo name="Sander's Codehouse" slogan="Let's code..." />
        </Link>
      }
    />
  );
}
