import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { PreviewWindow } from './preview-window';
import styles from './previews.module.css';

const weeklyBookings = [32, 41, 38, 52, 48, 61, 58, 70, 66, 79, 74, 88];

const chart = { width: 240, height: 72, top: 8 };

function chartPoints(values: number[]) {
  const max = Math.max(...values);
  const step = chart.width / (values.length - 1);

  return values.map((value, index) => ({
    x: index * step,
    y: chart.top + (1 - value / max) * (chart.height - chart.top - 6),
  }));
}

const points = chartPoints(weeklyBookings);
const line = points.map(({ x, y }, index) => `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
const area = `${line} L${chart.width} ${chart.height} L0 ${chart.height} Z`;
const last = points[points.length - 1]!;

const schedule = [
  { time: '09:00', client: 'Van Dijk B.V.', task: 'dashboard_row_1', confirmed: true },
  { time: '11:30', client: 'Bakkerij Smit', task: 'dashboard_row_2', confirmed: true },
  { time: '14:15', client: 'Studio Noord', task: 'dashboard_row_3', confirmed: false },
] as const;

/**
 * Business solutions: an operations overview — period tabs, three KPIs, a quarter of weekly bookings as an area
 * chart, and today's schedule. Deliberately not the commercial page's sidebar/bar-chart/table dashboard.
 */
export function DashboardPreview() {
  const t = useTranslations('ServicePreviews');

  const kpis = [
    { label: t('dashboard_kpi_bookings'), value: '1,086', delta: '+12%' },
    { label: t('dashboard_kpi_tickets'), value: '14', delta: '−5' },
    { label: t('dashboard_kpi_ontime'), value: '97.4%', delta: '+1.8' },
  ];

  return (
    <PreviewWindow address={t('dashboard_title')}>
      <div className="grid gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="bg-muted/60 flex gap-1 rounded-lg p-1 text-[11px]">
            <span className="text-muted-foreground px-2.5 py-0.5">{t('dashboard_tab_today')}</span>
            <span className="bg-background rounded-md px-2.5 py-0.5 font-medium shadow-sm">
              {t('dashboard_tab_week')}
            </span>
            <span className="text-muted-foreground px-2.5 py-0.5">{t('dashboard_tab_month')}</span>
          </span>
          <span className="flex -space-x-1.5">
            <span className="border-card size-6 rounded-full border-2 bg-(--accent)/60" />
            <span className="border-card bg-brand-violet-bright/60 size-6 rounded-full border-2" />
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {kpis.map(kpi => (
            <div key={kpi.label} className="bg-background/60 border-border/50 rounded-lg border p-2.5">
              <span className="text-muted-foreground block truncate text-[10px] tracking-wider uppercase">
                {kpi.label}
              </span>
              <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                <span className="text-lg font-semibold tabular-nums">{kpi.value}</span>
                <span className="text-[10px] font-medium text-(--accent-ink)">{kpi.delta}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr]">
          <div className="bg-background/60 border-border/50 rounded-lg border p-3">
            <span className="text-muted-foreground block text-[10px] tracking-wider uppercase">
              {t('dashboard_chart_label')}
            </span>
            <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="mt-3 h-auto w-full overflow-visible">
              <defs>
                <linearGradient id="dashboard-preview-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map(fraction => (
                <line
                  key={fraction}
                  x1="0"
                  x2={chart.width}
                  y1={chart.height * fraction}
                  y2={chart.height * fraction}
                  className="stroke-border"
                  strokeDasharray="2 4"
                />
              ))}
              <path d={area} fill="url(#dashboard-preview-fill)" className={styles.chartReveal} />
              <path
                d={line}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className={styles.chartLine}
              />
              <circle cx={last.x} cy={last.y} r="4" fill="var(--accent)" className={styles.chartReveal} />
            </svg>
          </div>

          <div className="bg-background/60 border-border/50 grid content-start gap-2 rounded-lg border p-3">
            <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
              {t('dashboard_schedule_label')}
            </span>
            {schedule.map(row => (
              <div key={row.time} className="grid grid-cols-[2.6rem_1fr] items-center gap-2">
                <span className="text-muted-foreground font-mono text-[11px]">{row.time}</span>
                <span className="grid">
                  <span className="truncate text-xs font-medium">{row.client}</span>
                  <span className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-muted-foreground truncate">{t(row.task)}</span>
                    <span
                      className={cn(
                        'rounded px-1 font-medium',
                        row.confirmed ? 'bg-(--accent)/15 text-(--accent-ink)' : 'bg-muted text-muted-foreground',
                      )}>
                      {t(row.confirmed ? 'dashboard_status_confirmed' : 'dashboard_status_pending')}
                    </span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWindow>
  );
}
