'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';

import { useEffect, useRef, useState } from 'react';

import type { CSSProperties, ReactNode } from 'react';

import { Link } from '@/i18n/navigation';

export type ServiceChannel = {
  id: string;
  accent: string;
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
  features: string[];
  href: string;
};

type ServiceConsoleProps = {
  /** Logo and title, rendered on the server. */
  display: ReactNode;
  channels: ServiceChannel[];
  callToAction: string;
  /** Accessible name of the channel selector. */
  selectorLabel: string;
};

function channelNumber(index: number) {
  return String(index + 1).padStart(2, '0');
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

/**
 * The services as channels on a console. One selector drives one deck:
 * - Phones: the deck is a horizontal swipe track; swiping updates the selector and tapping it scrolls the deck.
 * - lg+: the selector is a vertical list beside the display and the deck shows one channel at a time.
 *
 * The whole section takes the selected channel's accent (`--console-accent`, a registered color), so changing
 * channel shifts the surface instead of jumping between hard-edged blocks. Every panel is in the server HTML.
 */
export function ServiceConsole({ display, channels, callToAction, selectorLabel }: ServiceConsoleProps) {
  const [active, setActive] = useState(0);
  const [switched, setSwitched] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = deck.scrollLeft + deck.clientWidth / 2;
        const panels = Array.from(deck.children) as HTMLElement[];
        const distances = panels.map(panel => Math.abs(panel.offsetLeft + panel.offsetWidth / 2 - center));
        setActive(distances.indexOf(Math.min(...distances)));
      });
    };

    deck.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      deck.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function select(index: number) {
    setActive(index);
    setSwitched(true);
    const deck = deckRef.current;
    const panel = deck?.children[index] as HTMLElement | undefined;
    // Only the phone layout scrolls sideways; on lg the deck stacks its panels and there is nothing to scroll.
    if (deck && panel && deck.scrollWidth > deck.clientWidth) {
      panel.scrollIntoView({ behavior: scrollBehavior(), block: 'nearest', inline: 'start' });
    }
  }

  return (
    <section
      aria-labelledby="services-title"
      id="services"
      data-switched={switched || undefined}
      className="ch-console"
      style={{ '--console-accent': channels[active]?.accent } as CSSProperties}>
      <div className="ch-console-grid mx-auto w-full max-w-7xl">
        {display}
        <nav aria-label={selectorLabel} className="ch-console-selector">
          <ol className="ch-selector-list">
            {channels.map((channel, index) => (
              <li key={channel.id} className="ch-selector-item" style={{ '--item': index } as CSSProperties}>
                <button
                  type="button"
                  aria-controls={`channel-${channel.id}`}
                  aria-current={index === active}
                  onClick={() => select(index)}
                  className="ch-selector-button"
                  style={{ '--accent': channel.accent } as CSSProperties}>
                  <span className="ch-selector-number font-digital">{channelNumber(index)}</span>
                  <span className="ch-selector-label font-digital">{channel.label}</span>
                  <span aria-hidden className="ch-selector-title">
                    {channel.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <div ref={deckRef} className="ch-deck">
          {channels.map((channel, index) => {
            const titleId = `channel-${channel.id}-title`;

            return (
              <article
                key={channel.id}
                id={`channel-${channel.id}`}
                aria-labelledby={titleId}
                data-active={index === active || undefined}
                className="ch-panel"
                style={{ '--accent': channel.accent } as CSSProperties}>
                <div
                  className="ch-panel-item flex items-center justify-between"
                  style={{ '--item': 0 } as CSSProperties}>
                  <span className="font-digital text-sm tracking-widest text-(--accent)">
                    CH {channelNumber(index)}
                  </span>
                  <span aria-hidden className="text-(--accent) [&_svg]:size-10 lg:[&_svg]:size-12">
                    {channel.icon}
                  </span>
                </div>
                <h2
                  id={titleId}
                  className="ch-panel-item text-3xl font-bold text-balance lg:text-5xl"
                  style={{ '--item': 1 } as CSSProperties}>
                  {channel.title}
                </h2>
                <p
                  className="ch-panel-item text-foreground/80 text-lg lg:text-xl"
                  style={{ '--item': 2 } as CSSProperties}>
                  {channel.description}
                </p>
                <ul
                  role="list"
                  className="ch-panel-item grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:text-base"
                  style={{ '--item': 3 } as CSSProperties}>
                  {channel.features.map(feature => (
                    <li key={feature} className="flex gap-3">
                      <span aria-hidden className="mt-[0.55em] h-1 w-3 shrink-0 rounded-sm bg-(--accent)" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="ch-panel-item mt-auto pt-2" style={{ '--item': 4 } as CSSProperties}>
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={<Link href={channel.href} aria-describedby={titleId} />}
                    className={cn(
                      'h-11 bg-(--accent) px-5 text-base font-semibold text-neutral-950',
                      'hover:bg-(--accent)/85 [a]:hover:bg-(--accent)/85',
                    )}>
                    {callToAction}
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
