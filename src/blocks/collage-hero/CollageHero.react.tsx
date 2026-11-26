import { Button, Card, CardContent, Stat } from "opui-css/react"

export default function CollageHero() {
  return (
    <>
      <div
        className="collage-hero ui-layout-container"
        style={{ "--_max-inline-size": "72rem" }}
      >
        <div
          className="collage-inner ui-layout-columns"
          style={{ "--_columns": "1fr 1.1fr", "--_gap": "var(--ui-space-12)" }}
        >
          <div
            className="collage-copy ui-layout-column"
            style={{ "--_gap": "var(--ui-space-6)" }}
          >
            <p className="ui-overline">Bassbook Retreats</p>
            <h1 className="collage-title">
              Practice somewhere worth the drive
            </h1>
            <p className="collage-pitch">
              Rehearsal cabins by the fjord, in the forest and up the mountain.
              Book a weekend with your band, the gear is already there.
            </p>
            <div className="ui-layout-row">
              <Button href="#collage-hero-book" size="large" variant="filled">
                Find a cabin
              </Button>
              <Button
                href="#collage-hero-how"
                size="large"
                variant="transparent"
              >
                How it works
              </Button>
            </div>
            <dl
              className="ui-layout-row"
              style={{ "--_gap": "var(--ui-space-7)" }}
            >
              <div>
                <dt className="ui-caption">Cabins</dt>
                <dd className="ui-h4">38</dd>
              </div>
              <div>
                <dt className="ui-caption">Bands hosted</dt>
                <dd className="ui-h4">1 240</dd>
              </div>
              <div>
                <dt className="ui-caption">Noise complaints</dt>
                <dd className="ui-h4">0</dd>
              </div>
            </dl>
          </div>
          <div className="collage">
            <div
              aria-hidden="true"
              className="collage-scene collage-a"
              style={{ "--_shift": "0" }}
            ></div>
            <div
              aria-hidden="true"
              className="collage-scene collage-b"
              style={{ "--_shift": "120" }}
            ></div>
            <div
              aria-hidden="true"
              className="collage-scene collage-c"
              style={{ "--_shift": "220" }}
            ></div>
            <Card className="collage-stat" density="dense" variant="elevated">
              <CardContent>
                <Stat label="Next free weekend" size="small">
                  14 to 16 May
                </Stat>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <style>{`
        .collage-hero {
          container-type: inline-size;

          .collage-inner {
            align-items: center;
          }

          .collage-copy {
            align-items: start;
          }

          .collage-title {
            color: var(--ui-text-strong);
            font-size: clamp(var(--ui-font-size-800), 6cqi, var(--ui-font-size-900));
            letter-spacing: var(--ui-letter-spacing-display);
            line-height: var(--ui-line-height-tight);
            text-wrap: balance;
          }

          .collage-pitch {
            font-size: var(--ui-font-size-large);
            max-inline-size: 34rem;
          }

          .collage {
            display: grid;
            gap: var(--ui-space-5);
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-template-rows: repeat(6, clamp(3rem, 7cqi, 4.5rem));
            position: relative;

            .collage-scene {
              --_far: oklch(
                from var(--ui-primary) 0.62 0.09 calc(h + var(--_shift, 0))
              );
              --_near: oklch(
                from var(--ui-primary) 0.36 0.08 calc(h + var(--_shift, 0))
              );
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
                radial-gradient(
                  circle at 72% 28%,
                  var(--_sun) 0 7%,
                  transparent 7.5%
                ),
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
              border-radius: var(--ui-radius);
              box-shadow: var(--ui-shadow-elevated);
            }

            .collage-a {
              grid-area: 1 / 1 / 5 / 5;
            }

            .collage-b {
              grid-area: 2 / 5 / 7 / 7;
            }

            .collage-c {
              grid-area: 5 / 2 / 7 / 5;
            }

            .collage-stat {
              grid-area: 4 / 1 / 6 / 3;
              inline-size: max-content;
              place-self: center start;
              z-index: 1;
            }
          }
        }
      `}</style>
    </>
  )
}
