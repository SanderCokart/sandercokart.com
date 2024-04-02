import { useTranslations } from 'next-intl';

import { links } from '@/lib/nav-links';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function Links({ className }: { className?: string }) {
  const t = useTranslations('nav');

  return (
    <div className={cn('flex-wrap justify-center gap-x-8 gap-y-1 justify-self-center text-2xl', className)}>
      {links.map(link => (
        <Link
          key={link.href}
          className="font-digital leading-none transition-colors hover:text-accent"
          href={link.href}>
          {t(link.t)}
        </Link>
      ))}
    </div>
  );
}
