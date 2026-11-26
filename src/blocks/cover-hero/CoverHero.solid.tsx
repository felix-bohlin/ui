/** @jsxImportSource @solidjs/web */
import { Button } from "opui-css/solid"

export default function CoverHero() {
  return (
    <>
      <div class="cover-hero">
        <div aria-hidden="true" class="cover-image"></div>
        <div class="cover-scrim"></div>
        <div
          class="cover-content ui-dark ui-layout-column"
          style="--_gap: var(--ui-space-5)"
        >
          <p class="ui-overline">Bassbook Road Trip, summer 2027</p>
          <h1 class="cover-title">
            Twelve coast towns. One van. All the bass.
          </h1>
          <p class="cover-pitch">
            Join four bands on a two-week tour along the cliffs, with a gig
            every night and a jam session every morning. Bring your own bass, we
            bring the amps.
          </p>
          <div class="ui-layout-row">
            <Button href="#cover-hero-apply" size="large" variant="filled">
              Apply for a seat
            </Button>
            <Button href="#cover-hero-route" size="large" variant="outlined">
              See the route
            </Button>
          </div>
          <ul
            class="ui-layout-row cover-facts"
            style="--_gap: var(--ui-space-5)"
          >
            <li>
              <strong>14</strong> days
            </li>
            <li>
              <strong>12</strong> gigs
            </li>
            <li>
              <strong>4</strong> bands
            </li>
            <li>
              <strong>1</strong> very patient driver
            </li>
          </ul>
        </div>
      </div>
      <style>{`
        .cover-hero {
          border-radius: var(--ui-radius);
          container-type: inline-size;
          display: grid;
          isolation: isolate;
          min-block-size: 36rem;
          overflow: hidden;

          > * {
            grid-area: 1 / 1;
          }

          .cover-image {
            --_far: oklch(
              from var(--ui-primary) 0.62 0.09 calc(h + var(--_shift, 0))
            );
            --_near: oklch(
              from var(--ui-primary) 0.36 0.08 calc(h + var(--_shift, 0))
            );
            --_shift: 40;
            --_sky: oklch(
              from var(--ui-primary) 0.86 0.07 calc(h + var(--_shift, 0))
            );
            --_sun: oklch(
              from var(--ui-primary) 0.96 0.09 calc(h + var(--_shift, 0) + 60)
            );

            background-color: var(--_sky);
            background-image:
              conic-gradient(
                from 135deg at 50% 40%,
                var(--_near) 90deg,
                transparent 0
              ),
              conic-gradient(
                from 135deg at 50% 25%,
                var(--_far) 90deg,
                transparent 0
              ),
              radial-gradient(circle at 86% 16%, var(--_sun) 0 5%, transparent 5.5%),
              linear-gradient(var(--_sky), var(--_sun));
            background-position:
              0 100%,
              20% 100%,
              0 0,
              0 0;
            background-repeat: repeat-x, repeat-x, no-repeat, no-repeat;
            background-size:
              45% 50%,
              32% 72%,
              100% 100%,
              100% 100%;
            z-index: -2;
          }

          .cover-scrim {
            background-image: linear-gradient(
              to top,
              oklch(0.15 0.02 260 / 90%),
              oklch(0.15 0.02 260 / 65%) 45%,
              oklch(0.15 0.02 260 / 35%)
            );
            z-index: -1;
          }

          .cover-content {
            align-items: start;
            background-color: transparent;
            justify-content: end;
            padding: var(--ui-space-8) var(--ui-space-6);

            @container (inline-size >= 48rem) {
              padding: var(--ui-space-8);
            }
          }

          .cover-title {
            color: var(--ui-text-strong);
            font-size: clamp(var(--ui-font-size-800), 8cqi, var(--ui-font-size-900));
            letter-spacing: var(--ui-letter-spacing-display);
            line-height: var(--ui-line-height-tight);
            max-inline-size: 16ch;
            text-wrap: balance;
          }

          .cover-pitch {
            font-size: var(--ui-font-size-large);
            max-inline-size: 36rem;
          }

          .cover-facts {
            font-size: var(--ui-font-size-small);
          }
        }
      `}</style>
    </>
  )
}
