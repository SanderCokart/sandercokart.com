'use client';

type DateDisplayProps = {
  format: 'date' | 'datetime';
  date: Date | string | null | undefined;
  fallback?: React.ReactNode;
};

const DateDisplay = ({ format, date, fallback }: DateDisplayProps) => {
  if (date == null) {
    return <>{fallback ?? null}</>;
  }

  const dateObject = typeof date === 'string' ? new Date(date) : date;
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: format === 'datetime' ? 'medium' : undefined,
  });

  return (
    <time suppressHydrationWarning dateTime={dateObject.toISOString()}>
      {dateFormatter.format(dateObject)}
    </time>
  );
};

export { DateDisplay };
export type { DateDisplayProps };

