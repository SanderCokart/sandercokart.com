import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';

import { LocaleSwitcher } from '@/src/components/locale-switcher';
import { Navigation } from '@/src/components/navigation';
import { Link } from '@/src/i18n/navigation';

export function ServiceHeader() {
  return (
    <BrandHeader
      localeSwitcher={<LocaleSwitcher />}
      navigation={<Navigation />}
      namedLogo={<NamedLogo href="/" Component={Link} name="Sander's Codehouse" slogan="Let's code..." />}
    />
  );
}
