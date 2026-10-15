import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { Navigation } from '@/components/navigation';
import { SegmentLogo } from '@/components/segment-logo';

import { Link } from '@/i18n/navigation';
import { serviceLinks } from '@/lib/nav-links';

export function Header() {
  return (
    <BrandHeader
      localeSwitcher={<LocaleSwitcher />}
      navigation={<Navigation links={serviceLinks} variant="adaptive" />}
      namedLogo={
        <NamedLogo
          href="/"
          Component={Link}
          name="Sander's Codehouse"
          slogan="Let's code..."
          logo={<SegmentLogo className="absolute inset-0 size-full [--logo-delay:0.1s]" />}
        />
      }
    />
  );
}
