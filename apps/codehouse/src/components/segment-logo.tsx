import type { ComponentProps, CSSProperties } from 'react';

import './segment-logo.css';

/** Geometry copied from `images/sc-logo.svg`; the right frame half is the left one mirrored. */
const frameHalf = [
  '503,68 503,152 265,340 265,640 218,688 193,664 193,312',
  '276,652 460,652 503,695 503,722 262,722 232,694',
];

const letterS = [
  '372,320 485,320 503,340 485,364 372,364 352,342',
  '343,358 362,378 355,442 333,462 314,443 321,378',
  '357,450 462,450 483,472 465,494 357,494 337,472',
  '487,482 505,500 497,568 473,590 455,570 463,503',
  '328,577 445,577 466,598 445,620 328,620 307,598',
];

const letterC = [
  '593,320 700,320 718,338 698,364 592,364 573,345',
  '562,355 578,373 570,445 548,465 535,450 542,375',
  '558,480 575,497 565,568 548,585 527,568 536,497',
  '578,578 675,578 718,621 578,621 557,600',
];

function segment(index: number): CSSProperties {
  return { '--segment': index } as CSSProperties;
}

/**
 * The SC mark as inline SVG so it paints with the HTML (the PNG arrived after any entrance had already run) and
 * its parts can move: the frame halves close in from both sides, then the seven-segment letters power on.
 * Timing lives in segment-logo.css; `--logo-delay` on any ancestor shifts the whole sequence.
 *
 * Pass `label` when the mark stands alone; leave it out where adjacent text already names it (the header).
 */
export function SegmentLogo({ className, label, ...props }: ComponentProps<'svg'> & { label?: string }) {
  return (
    <svg
      {...(label ? { 'role': 'img', 'aria-label': label } : { 'aria-hidden': true })}
      viewBox="193 68 639 654"
      className={className}
      {...props}>
      <g className="sc-logo-frame-left" fill="#5d0ec0">
        {frameHalf.map(points => (
          <polygon key={points} points={points} />
        ))}
      </g>
      <g className="sc-logo-frame-right">
        <g fill="#00d492" transform="translate(1025 0) scale(-1 1)">
          {frameHalf.map(points => (
            <polygon key={points} points={points} />
          ))}
        </g>
      </g>
      <g fill="#5d0ec0">
        {letterS.map((points, index) => (
          <polygon key={points} points={points} className="sc-logo-segment" style={segment(index)} />
        ))}
      </g>
      <g fill="#00d492">
        {letterC.map((points, index) => (
          <polygon key={points} points={points} className="sc-logo-segment" style={segment(index + 1)} />
        ))}
      </g>
    </svg>
  );
}
