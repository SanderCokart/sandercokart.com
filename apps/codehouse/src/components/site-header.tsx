import { Header as BrandHeader } from '@repo/ui/components/header';
import { NamedLogo } from '@repo/ui/components/header/named-logo';

import { IntroOnce } from '@/components/intro-once';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { SegmentLogo } from '@/components/segment-logo';
import { SiteNavigation } from '@/components/site-navigation';

import { Link } from '@/i18n/navigation';

import './site-header.css';

/**
 * The one header for every Codehouse page. It lives in the `[locale]` layout so it stays mounted across page
 * navigations and its entrance (mark power-on, typed name and slogan) plays once per page load; IntroOnce covers
 * the remount a locale switch causes. SiteNavigation picks the links for the current page.
 */
export function SiteHeader() {
  return (
    <IntroOnce>
      <BrandHeader
        localeSwitcher={<LocaleSwitcher />}
        navigation={<SiteNavigation />}
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
    </IntroOnce>
  );
}
