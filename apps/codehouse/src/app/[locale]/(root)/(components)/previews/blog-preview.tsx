import { cn } from '@repo/ui/lib/utils';
import { useFormatter, useTranslations } from 'next-intl';

import { PreviewWindow } from './preview-window';
import styles from './previews.module.css';

const posts = [
  { title: 'blog_post_2_title', date: '2026-02-21', minutes: 4, art: styles.artDusk },
  { title: 'blog_post_3_title', date: '2026-01-30', minutes: 7, art: styles.artMoss },
] as const;

/** Personal websites: a small studio blog with a featured post and two more posts. */
export function BlogPreview() {
  const t = useTranslations('ServicePreviews');
  const format = useFormatter();
  const date = (iso: string) => format.dateTime(new Date(iso), { day: 'numeric', month: 'short' });

  return (
    <PreviewWindow address="milajansen.nl">
      <div className="grid gap-3.5 p-4">
        <div className="flex items-baseline justify-between">
          <span className="font-serif text-lg italic">Mila Jansen</span>
          <span className="text-muted-foreground flex gap-4 text-xs">
            <span className="text-foreground underline decoration-(--accent) decoration-2 underline-offset-4">
              {t('blog_nav_journal')}
            </span>
            <span>{t('blog_nav_work')}</span>
            <span>{t('blog_nav_about')}</span>
          </span>
        </div>

        <div className="grid items-center gap-4 sm:grid-cols-[1.1fr_1fr] sm:gap-5">
          <div className={cn(styles.artClay, 'aspect-[2/1] rounded-lg')} />
          <div className="grid gap-2">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-(--accent-ink) uppercase">
              {t('blog_featured')}
            </span>
            <span className="font-serif text-xl leading-snug">{t('blog_post_1_title')}</span>
            <span className="text-muted-foreground text-xs">
              {date('2026-03-12')} · {t('blog_read_time', { minutes: 6 })}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {posts.map(post => (
            <div key={post.title} className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
              <div className={cn(post.art, 'aspect-square rounded-md')} />
              <div className="grid gap-1">
                <span className="font-serif text-sm leading-snug">{t(post.title)}</span>
                <span className="text-muted-foreground text-[11px]">
                  {date(post.date)} · {t('blog_read_time', { minutes: post.minutes })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewWindow>
  );
}
