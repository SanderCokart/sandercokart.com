import { cn } from '@repo/ui/lib/utils';
import { GitMergeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PreviewWindow } from './preview-window';
import styles from './previews.module.css';

type Token = [kind: 'kw' | 'fn' | 'ty' | 'tx' | 'pu', text: string];

/** A component you would find in a client's codebase, pre-tokenised so it renders with simple highlighting. */
const code: Token[][] = [
  [
    ['kw', 'export function '],
    ['fn', 'BookingFlow'],
    ['pu', '({ '],
    ['tx', 'slots'],
    ['pu', ' }: '],
    ['ty', 'Props'],
    ['pu', ') {'],
  ],
  [
    ['kw', '  const '],
    ['pu', '['],
    ['tx', 'slot, setSlot'],
    ['pu', '] = '],
    ['fn', 'useState'],
    ['pu', '<'],
    ['ty', 'Slot'],
    ['pu', '>();'],
  ],
  [
    ['kw', '  const '],
    ['pu', '{ '],
    ['tx', 'data'],
    ['pu', ' } = '],
    ['fn', 'useAvailability'],
    ['pu', '('],
    ['tx', 'slots'],
    ['pu', ');'],
  ],
  [],
  [
    ['kw', '  return '],
    ['pu', '('],
  ],
  [
    ['pu', '    <'],
    ['fn', 'Stepper'],
    ['tx', ' onComplete'],
    ['pu', '={() => '],
    ['fn', 'book'],
    ['pu', '('],
    ['tx', 'slot'],
    ['pu', ')}>'],
  ],
  [
    ['pu', '      <'],
    ['fn', 'SlotPicker'],
    ['tx', ' value'],
    ['pu', '={'],
    ['tx', 'slot'],
    ['pu', '} '],
    ['tx', 'options'],
    ['pu', '={'],
    ['tx', 'data'],
    ['pu', '} />'],
  ],
  [
    ['pu', '    </'],
    ['fn', 'Stepper'],
    ['pu', '>'],
  ],
  [['pu', '  );']],
  [['pu', '}']],
];

const tokenClass: Record<Token[0], string> = {
  kw: 'text-brand-violet-bright dark:text-[#b48cff]',
  fn: 'text-(--accent-ink)',
  ty: 'text-amber-600 dark:text-amber-300',
  tx: 'text-foreground/85',
  pu: 'text-muted-foreground',
};

const board = [
  { label: 'freelance_board_todo', count: 3, fill: 0.3 },
  { label: 'freelance_board_doing', count: 2, fill: 0.55 },
  { label: 'freelance_board_done', count: 9, fill: 1 },
] as const;

/**
 * Freelance development: day-to-day work inside someone else's team — the component being built, the test run,
 * the sprint it belongs to and the pull request that landed it.
 */
export function FreelancePreview() {
  const t = useTranslations('ServicePreviews');

  return (
    <div aria-hidden className="pointer-events-none relative grid grid-cols-2 gap-3 sm:block sm:pr-24 sm:pb-12">
      <PreviewWindow address="booking-flow.tsx" className="col-span-2">
        <pre className="overflow-hidden px-4 py-3 font-mono text-[11px] leading-[1.75] sm:text-xs">
          {code.map((tokens, line) => (
            <span key={line} className="grid grid-cols-[1.75rem_1fr]">
              <span className="text-muted-foreground/50 select-none">{line + 1}</span>
              <span className="whitespace-pre">
                {tokens.map(([kind, text], index) => (
                  <span key={index} className={tokenClass[kind]}>
                    {text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </pre>
        <div className="border-border/60 bg-muted/40 flex items-center gap-2 border-t px-4 py-2 font-mono text-[11px]">
          <span className="text-(--accent-ink)">✓</span>
          <span className="text-muted-foreground">{t('freelance_tests', { count: 48 })}</span>
        </div>
      </PreviewWindow>

      <div className="bg-card/95 rounded-lg border border-(--accent)/25 p-3 shadow-lg sm:absolute sm:top-6 sm:right-0 sm:w-44">
        <span className="text-muted-foreground block text-[10px] tracking-wider uppercase">
          {t('freelance_board_label', { number: 14 })}
        </span>
        <div className="mt-2 grid gap-1.5">
          {board.map(column => (
            <div key={column.label} className="grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 text-[11px]">
              <span>{t(column.label)}</span>
              <span className="text-muted-foreground tabular-nums">{column.count}</span>
              <span className="bg-muted col-span-2 h-1 overflow-hidden rounded-full">
                <span
                  className={cn(styles.boardFill, 'block h-full rounded-full bg-(--accent)')}
                  style={{ width: `${column.fill * 100}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card/95 border-brand-violet-bright/30 flex flex-col gap-2 rounded-lg border p-3 shadow-lg sm:absolute sm:right-0 sm:bottom-0 sm:w-64">
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="bg-brand-violet-bright flex items-center gap-1 rounded px-1.5 py-0.5 font-semibold text-white">
            <GitMergeIcon aria-hidden className="size-3" />
            {t('freelance_pr_merged')}
          </span>
          <span className="text-muted-foreground font-mono">#214</span>
        </div>
        <span className="text-xs leading-snug font-medium">{t('freelance_pr_title')}</span>
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="flex -space-x-1.5">
            {['SC', 'JV', 'AK'].map(initials => (
              <span
                key={initials}
                className="border-card bg-muted grid size-6 place-items-center rounded-full border-2 text-[9px] font-semibold">
                {initials}
              </span>
            ))}
          </span>
          <span className="text-muted-foreground text-[11px]">{t('freelance_pr_reviews', { count: 2 })}</span>
        </div>
      </div>
    </div>
  );
}
