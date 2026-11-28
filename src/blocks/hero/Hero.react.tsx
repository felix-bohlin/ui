import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  Progress,
  Rating,
  Stat,
} from "opui-css/react"

export default function Hero() {
  return (
    <>
      <div
        className="hero ui-layout-container"
        style={{ "--_max-inline-size": "76rem" }}
      >
        <div
          className="ui-layout-columns hero-inner"
          style={{ "--_columns": "1fr 1.1fr", "--_gap": "var(--ui-space-12)" }}
        >
          <div className="ui-layout-column ui-gap-large hero-copy">
            <Chip
              end={
                <svg
                  data-icon="chevron-right"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M8.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4l5.29-5.3L8.3 6.7a1 1 0 0 1 0-1.4"
                  ></path>
                </svg>
              }
              href="#hero-megaphone"
              label="New: The Megaphone shoutbox is here!"
              variant="outlined"
            />
            <h1 className="ui-h1 hero-title">
              Finally, a place where the bass player gets heard
            </h1>
            <p className="hero-pitch">
              Bassbook brings your gigs, gear and bass buddies together, so you
              spend less time waiting for the band to text back and more time
              slapping.
            </p>
            <div className="ui-layout-row">
              <Button href="#hero-sign-up" size="large" variant="filled">
                Join for free
              </Button>
              <Button href="#hero-demo" size="large" variant="outlined">
                <svg
                  data-icon="play"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m-2 4.27a1 1 0 0 1 1.5-.86l5 3a1 1 0 0 1 0 1.72l-5 3A1 1 0 0 1 10 14.27z"
                  ></path>
                </svg>
                <span className="ui-text">Watch the demo</span>
              </Button>
            </div>
            <p className="ui-layout-row">
              <Rating
                aria-hidden="true"
                defaultValue={4.9}
                label="Rated 4.9 out of 5"
                size="small"
              />
              <span>
                <strong>4.9/5</strong> from 1&nbsp;200+ happy bassists
              </span>
            </p>
          </div>
          <div className="hero-preview">
            <Card
              aria-label="Preview of a Bassbook gig page with three stats and three practice goals in progress"
              className="hero-window"
              role="img"
              variant="elevated"
            >
              <div className="ui-layout-row ui-gap-small hero-toolbar">
                <span className="ui-swatch"></span>
                <span className="ui-swatch"></span>
                <span className="ui-swatch"></span>
                <span className="hero-url ui-caption">
                  bassbook.example/gigs/42
                </span>
              </div>
              <div className="ui-layout-column hero-screen">
                <div className="ui-layout-row ui-gap-small ui-spread">
                  <strong>Gig #42</strong>
                  <Chip as="span" label="Showtime Oct 16" size="small" />
                </div>
                <div
                  className="ui-layout-grid ui-gap-small"
                  style={{
                    "--_max-columns": "3",
                    "--_min-inline-size": "4rem",
                  }}
                >
                  <Card density="dense" variant="outlined">
                    <CardContent>
                      <Stat label="Songs" size="small">
                        18
                      </Stat>
                    </CardContent>
                  </Card>
                  <Card density="dense" variant="outlined">
                    <CardContent>
                      <Stat label="Solos" size="small">
                        0
                      </Stat>
                    </CardContent>
                  </Card>
                  <Card density="dense" variant="outlined">
                    <CardContent>
                      <Stat label="Fans" size="small">
                        34
                      </Stat>
                    </CardContent>
                  </Card>
                </div>
                <List
                  bordered
                  className="hero-tasks"
                  dense
                  variant="transparent"
                >
                  <ListItem
                    description="Mohini Hertz"
                    end={<Progress max={100} value={80} variant="filled" />}
                    label="Learn the setlist"
                    start={<Avatar>MH</Avatar>}
                  />
                  <ListItem
                    description="Adam Groove"
                    end={<Progress max={100} value={55} variant="filled" />}
                    label="Restring the 5-string"
                    start={<Avatar>AG</Avatar>}
                  />
                  <ListItem
                    description="Ellen Nut"
                    end={<Progress max={100} value={30} variant="filled" />}
                    label="Nail the slap break"
                    start={<Avatar>EN</Avatar>}
                  />
                </List>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <style>{`
        .hero {
          .hero-inner {
            align-items: center;
          }

          .hero-copy {
            align-items: start;
          }

          .hero-title {
            font-size: clamp(var(--ui-font-size-800), 7cqi, var(--ui-font-size-900));
            letter-spacing: -0.02em;
            text-wrap: balance;
          }

          .hero-pitch {
            font-size: var(--ui-font-size-large);
            max-inline-size: 34rem;
          }

          .hero-preview {
            background-image: linear-gradient(
              135deg,
              oklch(from var(--ui-primary) l c h / 25%),
              oklch(from var(--ui-primary) l c calc(h + 60) / 15%)
            );
            border-radius: var(--ui-radius);
            padding: var(--ui-space-5);

            @container (inline-size >= 40rem) {
              padding: var(--ui-space-7);
            }
          }

          .hero-window {
            gap: 0;
          }

          .hero-toolbar {
            border-block-end: var(--ui-border-width) solid var(--ui-border-color);
            padding: var(--ui-space-2) var(--ui-space-4);

            .ui-swatch {
              --_swatch-bg-color: var(--ui-border-color);
            }

            .hero-url {
              margin-inline-start: var(--ui-space-2);
            }
          }

          .hero-screen {
            padding: var(--ui-space-4);

            strong {
              font-size: var(--ui-font-size-400);
            }
          }

          .hero-tasks {
            .ui-text p:last-child {
              font-size: var(--ui-font-size-caption);
            }

            .ui-progress {
              inline-size: 5rem;
            }
          }
        }
      `}</style>
    </>
  )
}
