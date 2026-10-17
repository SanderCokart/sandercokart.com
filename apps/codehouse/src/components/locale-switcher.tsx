'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/shadcn/dropdown-menu';
import { GB as GBFlag, NL as NLFlag } from 'country-flag-icons/react/3x2';
import { CheckIcon, LanguagesIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

/** Each language is named in itself, so a visitor can find theirs whatever the page is currently in. */
const locales = [
  { locale: 'en', name: 'English', Flag: GBFlag },
  { locale: 'nl', name: 'Nederlands', Flag: NLFlag },
] as const;

/**
 * Language menu: a single icon in the header that opens the languages with their flags. Items are real links with
 * `hrefLang`, so the alternate-language URLs stay crawlable.
 */
export function LocaleSwitcher() {
  // next-intl's usePathname already includes a leading `/` and omits the locale prefix.
  const pathname = usePathname();
  const activeLocale = useLocale();
  const t = useTranslations('LocaleSwitcher');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('label')}
        title={t('label')}
        className="hover:text-header-accent focus-visible:text-header-accent data-popup-open:text-header-accent grid place-items-center transition-colors">
        <LanguagesIcon aria-hidden className="size-7 sm:size-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-auto min-w-44">
        {locales.map(({ locale, name, Flag }) => {
          const active = locale === activeLocale;

          return (
            <DropdownMenuItem
              key={locale}
              className="gap-2.5 py-1.5 pr-2"
              render={
                <Link
                  replace
                  href={pathname}
                  hrefLang={locale}
                  lang={locale}
                  locale={locale}
                  rel="alternate"
                  scroll={false}
                  aria-current={active ? 'true' : undefined}
                />
              }>
              <Flag aria-hidden className="h-4 w-6 rounded-[2px]" />
              <span className="grow">{name}</span>
              {active ? <CheckIcon aria-hidden /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
