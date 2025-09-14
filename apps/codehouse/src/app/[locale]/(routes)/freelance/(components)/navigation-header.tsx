'use client';

import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { BsFillLightningFill } from 'react-icons/bs';
import { FaComment, FaSuitcase } from 'react-icons/fa';

import { Link } from '@/src/i18n/navigation';

export function NavigationHeader() {
  const t = useTranslations('common');

  return (
    <nav className={cn('relative z-50 mx-auto w-full max-w-4xl')}> 
      <div className={cn('flex items-center justify-center gap-6 md:gap-8 py-2')}> 
        <Link
          href={'/#portfolio'}
          className={cn(
            'font-digital flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-150',
            'text-primary-foreground hover:text-accent hover:scale-105',
          )}>
          <FaSuitcase className={cn('block md:hidden text-xl')} />
          <span className={cn('hidden md:inline text-xs md:text-2xl')}>{t('navigation_portfolio')}</span>
        </Link>

        <Link
          href={'/#techstack'}
          className={cn(
            'font-digital flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-150',
            'text-primary-foreground hover:text-accent hover:scale-105',
          )}>
          <BsFillLightningFill className={cn('block md:hidden text-xl')} />
          <span className={cn('hidden md:inline text-xs md:text-2xl')}>{t('navigation_tech-stack')}</span>
        </Link>

        <Link
          href={'/#testimonials'}
          className={cn(
            'font-digital flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-150',
            'text-primary-foreground hover:text-accent hover:scale-105',
          )}>
          <FaComment className={cn('block md:hidden text-xl')} />
          <span className={cn('hidden md:inline text-xs md:text-2xl')}>{t('navigation_testimonials')}</span>
        </Link>
      </div>
    </nav>
  );
}
