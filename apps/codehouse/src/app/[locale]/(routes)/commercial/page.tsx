import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/src/i18n/navigation';
import type { LocaleCode } from '@/src/i18n/config';

type PageParams = { params: Promise<{ locale: string }> };

const proposals = [
  { href: '/commercial/proposal-a', label: 'Proposal A', angle: 'Operations & ROI' },
  { href: '/commercial/proposal-b', label: 'Proposal B', angle: 'Partnership & Scale' },
  { href: '/commercial/proposal-c', label: 'Proposal C', angle: 'Product Showcase' },
  { href: '/commercial/proposal-d', label: 'Proposal D', angle: 'B + C, plain language' },
] as const;

/**
 * Temporary chooser while Business Solutions proposals are compared.
 */
export default async function CommercialIndexPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <section className="container mt-16 max-w-screen-md space-y-8 pb-16">
        <h1 className="text-center text-3xl font-bold uppercase sm:text-5xl">Business Solutions</h1>
        <p className="text-center text-muted-foreground text-balance">
          Proposal variants — pick one to review.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proposals.map(proposal => (
            <li key={proposal.href}>
              <Link
                href={proposal.href}
                className="border-primary/40 hover:border-accent block rounded-lg border-2 p-6 text-center transition-colors">
                <span className="block font-bold uppercase">{proposal.label}</span>
                <span className="text-muted-foreground mt-2 block text-sm">{proposal.angle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
