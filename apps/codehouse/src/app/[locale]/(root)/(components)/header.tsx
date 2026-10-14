import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { Navigation } from '@/components/navigation';

import { Link } from '@/i18n/navigation';
import { serviceLinks } from '@/lib/nav-links';

export function Header() {
  return (
    <BrandHeader
      localeSwitcher={<LocaleSwitcher />}
      navigation={<Navigation links={serviceLinks} />}
      namedLogo={<NamedLogo href="/" Component={Link} name="Sander's Codehouse" slogan="Let's code..." />}
    />
  );
}
