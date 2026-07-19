import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/src/i18n/navigation';
import type { LocaleCode } from '@/src/i18n/config';

type PageParams = { params: Promise<{ locale: string }> };

const proposals = [
  { href: '/freelance/proposal-a', label: 'Proposal A', angle: 'Portfolio & Craft' },
  { href: '/freelance/proposal-b', label: 'Proposal B', angle: 'Team Extension' },
  { href: '/freelance/proposal-c', label: 'Proposal C', angle: 'End-to-End Delivery' },
  { href: '/freelance/proposal-d', label: 'Proposal D', angle: 'A + B + C blend' },
] as const;

/**
 * Temporary chooser while Freelance Development proposals are compared.
 */
export default async function FreelanceIndexPage({ params }: PageParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <main className="grow">
      <section className="container mt-16 max-w-screen-md space-y-8 pb-16">
        <h1 className="text-center text-3xl font-bold uppercase sm:text-5xl">Freelance Development</h1>
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
