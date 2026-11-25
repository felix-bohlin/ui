import { Button } from "opui-css/react"

export default function CoverHero() {
  return (
    <>
      <div className="cover-hero">
        <img
          alt=""
          className="cover-image"
          height="900"
          src="https://picsum.photos/id/1018/1600/900"
          width="1600"
        />
        <div className="cover-scrim"></div>
        <div
          className="cover-content ui-dark ui-layout-column"
          style={{ "--_gap": "var(--ui-space-5)" }}
        >
          <p className="ui-overline">Bassbook Road Trip, summer 2027</p>
          <h1 className="cover-title">
            Twelve coast towns. One van. All the bass.
          </h1>
          <p className="cover-pitch">
            Join four bands on a two-week tour along the cliffs, with a gig
            every night and a jam session every morning. Bring your own bass, we
            bring the amps.
          </p>
          <div className="ui-layout-row">
            <Button href="#cover-hero-apply" size="large" variant="filled">
              Apply for a seat
            </Button>
            <Button href="#cover-hero-route" size="large" variant="outlined">
              See the route
            </Button>
          </div>
          <ul
            className="ui-layout-row cover-facts"
            style={{ "--_gap": "var(--ui-space-5)" }}
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
            block-size: 100%;
            inline-size: 100%;
            object-fit: cover;
            z-index: -2;
          }

          .cover-scrim {
            background-image: linear-gradient(
              to top,
              oklch(0.15 0.02 260 / 90%),
              oklch(0.15 0.02 260 / 55%) 45%,
              oklch(0.15 0.02 260 / 10%)
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
