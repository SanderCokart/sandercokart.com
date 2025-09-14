import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/src/i18n/navigation';

import { LocaleSwitcher } from '@/src/components/locale-switcher';

export async function Header() {
  const t = await getTranslations('Header');

  return (
    <BrandHeader
      localeSwitcher={<LocaleSwitcher />}
      namedLogo={
        <Link href="/">
          <NamedLogo name={t('NamedLogo_name')} slogan={t('NamedLogo_slogan')} />
        </Link>
      }
    />
  );
}
