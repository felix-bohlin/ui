import { Avatar, AvatarGroup, Button, Chip } from "opui-css/react"

export default function CenteredHero() {
  return (
    <>
      <div className="centered-hero">
        <div
          className="ch-inner ui-layout-container ui-layout-column ui-align-center"
          style={{
            "--_gap": "var(--ui-space-7)",
            "--_max-inline-size": "56rem",
          }}
        >
          <Chip
            href="#centered-hero-tour"
            label="Bassbook Live is touring 12 cities this spring"
            variant="outlined"
          />
          <h1 className="ch-title">
            Where the <em>bass</em> finally gets the spotlight
          </h1>
          <p className="ch-pitch">
            Find a band that needs you, book the rehearsal room and share the
            recording, all in one place made for people who hold the groove.
          </p>
          <div className="ui-layout-row ui-align-center">
            <Button href="#centered-hero-join" size="large" variant="filled">
              Join for free
            </Button>
            <Button href="#centered-hero-tour" size="large" variant="outlined">
              See the tour dates
            </Button>
          </div>
          <div className="ui-layout-row ui-gap-small ui-align-center">
            <AvatarGroup aria-label="Some of our members">
              <Avatar label="Adam Groove" src="/photos/adam-groove.png" />
              <Avatar aria-label="Ellen Nut" role="img">
                EN
              </Avatar>
              <Avatar
                label="Kinga Headstock"
                src="/photos/kinga-headstock.png"
              />
            </AvatarGroup>
            <span>Joined by 18 000 bassists this year</span>
          </div>
          <section
            aria-labelledby="centered-hero-bands-heading"
            className="ui-layout-column ui-gap-small"
          >
            <h2 className="ui-overline" id="centered-hero-bands-heading">
              Bands that started on Bassbook
            </h2>
            <ul
              className="ui-layout-row ui-align-center ch-bands"
              style={{ "--_gap": "var(--ui-space-7)" }}
            >
              <li>The Flatwounds</li>
              <li>Sub Club</li>
              <li>Drop D Dynasty</li>
              <li>Low B Loyal</li>
            </ul>
          </section>
        </div>
      </div>
      <style>{`
        .centered-hero {
          container-type: inline-size;
          isolation: isolate;
          padding-block: var(--ui-space-12);
          position: relative;
          text-align: center;

          &::before {
            background-image:
              radial-gradient(
                closest-side,
                oklch(from var(--ui-primary) l c h / 30%),
                transparent
              ),
              radial-gradient(
                closest-side,
                oklch(from var(--ui-primary) l c calc(h + 90) / 22%),
                transparent
              );
            background-position:
              30% 20%,
              70% 40%;
            background-repeat: no-repeat;
            background-size:
              60% 70%,
              55% 65%;
            content: "";
            inset: 0;
            position: absolute;
            z-index: -1;
          }

          .ch-inner {
            align-items: center;
            justify-items: center;
          }

          .ch-title {
            color: var(--ui-text-strong);
            font-size: clamp(var(--ui-font-size-800), 9cqi, var(--ui-font-size-900));
            letter-spacing: var(--ui-letter-spacing-display);
            line-height: var(--ui-line-height-tight);
            max-inline-size: 18ch;
            text-wrap: balance;

            em {
              color: var(--ui-primary-text);
              font-style: normal;
            }
          }

          .ch-pitch {
            font-size: var(--ui-font-size-large);
            max-inline-size: 38rem;
            text-wrap: pretty;
          }

          .ch-bands {
            color: var(--ui-text-subtle);
            font-size: var(--ui-font-size-large);
            font-weight: var(--ui-font-weight-bold);
            letter-spacing: var(--ui-letter-spacing-caps);
            row-gap: var(--ui-space-2);
            text-transform: uppercase;
          }
        }
      `}</style>
    </>
  )
}
