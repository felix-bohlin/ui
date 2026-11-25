/** @jsxImportSource @solidjs/web */
import { Button, Card, CardContent, Stat } from "opui-css/solid"

export default function CollageHero() {
  return (
    <>
      <div
        class="collage-hero ui-layout-container"
        style="--_max-inline-size: 72rem"
      >
        <div
          class="collage-inner ui-layout-columns"
          style="--_columns: 1fr 1.1fr; --_gap: var(--ui-space-8)"
        >
          <div
            class="collage-copy ui-layout-column"
            style="--_gap: var(--ui-space-5)"
          >
            <p class="ui-overline">Bassbook Retreats</p>
            <h1 class="collage-title">Practice somewhere worth the drive</h1>
            <p class="collage-pitch">
              Rehearsal cabins by the fjord, in the forest and up the mountain.
              Book a weekend with your band, the gear is already there.
            </p>
            <div class="ui-layout-row">
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
            <dl class="ui-layout-row" style="--_gap: var(--ui-space-6)">
              <div>
                <dt class="ui-caption">Cabins</dt>
                <dd class="ui-h4">38</dd>
              </div>
              <div>
                <dt class="ui-caption">Bands hosted</dt>
                <dd class="ui-h4">1 240</dd>
              </div>
              <div>
                <dt class="ui-caption">Noise complaints</dt>
                <dd class="ui-h4">0</dd>
              </div>
            </dl>
          </div>
          <div class="collage">
            <img
              alt="A deep blue fjord between steep mountains"
              class="collage-a"
              height="600"
              src="https://picsum.photos/id/1015/800/600"
              width="800"
            />
            <img
              alt="A tall pine forest in the fog"
              class="collage-b"
              height="800"
              src="https://picsum.photos/id/1044/600/800"
              width="600"
            />
            <img
              alt="Yellow tents in a snowy mountain camp"
              class="collage-c"
              height="450"
              src="https://picsum.photos/id/1036/800/450"
              width="800"
            />
            <Card class="collage-stat" density="dense" variant="elevated">
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
            gap: var(--ui-space-4);
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-template-rows: repeat(6, minmax(0, 3.5rem));
            position: relative;

            img {
              block-size: 100%;
              border-radius: var(--ui-radius);
              box-shadow: var(--ui-shadow-elevated);
              inline-size: 100%;
              object-fit: cover;
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
              place-self: center start;
              z-index: 1;
            }
          }
        }
      `}</style>
    </>
  )
}
