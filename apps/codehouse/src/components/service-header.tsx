import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';

import Image from 'next/image';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { Navigation } from '@/components/navigation';

import logoMark from '@/app/[locale]/images/sc-logo.png';
import { Link } from '@/i18n/navigation';
import { links } from '@/lib/nav-links';

export function ServiceHeader() {
  return (
    <BrandHeader
      localeSwitcher={<LocaleSwitcher />}
      navigation={<Navigation links={links} />}
      namedLogo={
        <NamedLogo
          href="/"
          Component={Link}
          name="Sander's Codehouse"
          slogan="Let's code..."
          logo={<Image src={logoMark} alt="" fill sizes="50px" className="object-contain" priority />}
        />
      }
    />
  );
}
