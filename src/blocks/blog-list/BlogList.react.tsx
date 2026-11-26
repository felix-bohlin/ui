import { Avatar, Button, Card, CardContent, Chip } from "opui-css/react"

export default function BlogList() {
  return (
    <>
      <div
        className="blog-list ui-layout-container ui-layout-column ui-large"
        style={{ "--_max-inline-size": "76rem" }}
      >
        <div className="ui-layout-row ui-spread blog-header">
          <hgroup className="ui-hgroup">
            <p>Bassbook diaries</p>
            <h1 className="ui-h2">Dear diary, they turned me down again</h1>
            <p>
              Gear deep dives, Bassbook news and totally true diaries from
              members.
            </p>
          </hgroup>
          <nav aria-label="Categories">
            <ul className="ui-layout-row ui-small">
              <li>
                <Chip
                  aria-current="page"
                  href="#blog-list-all"
                  label="All posts"
                />
              </li>
              <li>
                <Chip
                  href="#blog-list-gear"
                  label="Gear Talk"
                  variant="outlined"
                />
              </li>
              <li>
                <Chip
                  href="#blog-list-news"
                  label="Bassbook news"
                  variant="outlined"
                />
              </li>
              <li>
                <Chip
                  href="#blog-list-tips"
                  label="Tabs & tips"
                  variant="outlined"
                />
              </li>
              <li>
                <Chip
                  href="#blog-list-diaries"
                  label="Member diaries"
                  variant="outlined"
                />
              </li>
            </ul>
          </nav>
        </div>
        <Card
          as="article"
          className="ui-layout-columns blog-featured"
          style={{ "--_columns": "1.3fr 1fr", "--_gap": "0" }}
          variant="outlined"
        >
          <div
            className="blog-cover"
            style={{ "--hue": "0" }}
            role="img"
            aria-label="Cover image for Bassbook 6.0: a diary that hears every low note"
          ></div>
          <div className="ui-layout-column blog-featured-body">
            <hgroup className="ui-hgroup">
              <p>Featured</p>
              <h2 className="ui-h3">
                <a className="ui-card-link" href="#blog-list-bassbook-6">
                  Bassbook 6.0: a diary that hears every low note
                </a>
              </h2>
              <p>
                Mood icons, a smarter gig planner and a profile page that's
                three times louder. Here's what's new and how we built it.
              </p>
            </hgroup>
            <ul
              className="ui-layout-row ui-x-small blog-tags"
              aria-label="Tags"
            >
              <li>
                <Chip label="Bassbook news" size="small" />
              </li>
              <li>
                <Chip label="Release" size="small" />
              </li>
            </ul>
            <div className="ui-layout-media">
              <Avatar aria-hidden="true">LH</Avatar>
              <div>
                <p>Lou Headstock, Head of Groove</p>
                <p className="ui-caption">
                  <time dateTime="2026-10-01">Oct 1, 2026</time>, 12 min read
                </p>
              </div>
            </div>
          </div>
        </Card>
        <section
          className="ui-layout-column"
          aria-labelledby="blog-list-latest-heading"
        >
          <h2 className="ui-h4" id="blog-list-latest-heading">
            Latest posts
          </h2>
          <ul
            className="ui-layout-grid ui-large"
            style={{ "--_min-inline-size": "20rem" }}
          >
            <li>
              <Card as="article" variant="outlined">
                <div
                  className="blog-cover"
                  style={{ "--hue": "40" }}
                  role="img"
                  aria-label="Cover image for Inside my new pedalboard"
                ></div>
                <hgroup>
                  <h3 className="ui-h5">
                    <a className="ui-card-link" href="#blog-list-pedalboard">
                      Inside my new pedalboard
                    </a>
                  </h3>
                  <p>
                    How I fit 14 pedals on one board and cut my setup time from
                    40 minutes to 4.
                  </p>
                </hgroup>
                <CardContent className="blog-meta">
                  <ul
                    className="ui-layout-row ui-x-small blog-tags"
                    aria-label="Tags"
                  >
                    <li>
                      <Chip label="Gear Talk" size="small" />
                    </li>
                    <li>
                      <Chip label="Pedals" size="small" />
                    </li>
                  </ul>
                  <div className="ui-layout-media">
                    <Avatar aria-hidden="true">HH</Avatar>
                    <div>
                      <p>Holly Humbucker</p>
                      <p className="ui-caption">
                        <time dateTime="2026-09-30">Sep 30, 2026</time>, 9 min
                        read
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card as="article" variant="outlined">
                <div
                  className="blog-cover"
                  style={{ "--hue": "200" }}
                  role="img"
                  aria-label="Cover image for Jamming with guitarists on Bassbook"
                ></div>
                <hgroup>
                  <h3 className="ui-h5">
                    <a className="ui-card-link" href="#blog-list-jamming">
                      Jamming with guitarists on Bassbook
                    </a>
                  </h3>
                  <p>
                    Band invites, shared setlists and a few habits that keep
                    guitarists calm(ish).
                  </p>
                </hgroup>
                <CardContent className="blog-meta">
                  <ul
                    className="ui-layout-row ui-x-small blog-tags"
                    aria-label="Tags"
                  >
                    <li>
                      <Chip label="Guides" size="small" />
                    </li>
                    <li>
                      <Chip label="Jamming" size="small" />
                    </li>
                  </ul>
                  <div className="ui-layout-media">
                    <Avatar aria-hidden="true">IH</Avatar>
                    <div>
                      <p>Ines Hertz</p>
                      <p className="ui-caption">
                        <time dateTime="2026-09-22">Sep 22, 2026</time>, 5 min
                        read
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card as="article" variant="outlined">
                <div
                  className="blog-cover"
                  style={{ "--hue": "320" }}
                  role="img"
                  aria-label="Cover image for How Slap Like Now gig weekly with 4 bassists"
                ></div>
                <hgroup>
                  <h3 className="ui-h5">
                    <a className="ui-card-link" href="#blog-list-slap-like-now">
                      How Slap Like Now gig weekly with 4 bassists
                    </a>
                  </h3>
                  <p>
                    Sol Saddle on going from one gig a year to a gig every
                    single Friday.
                  </p>
                </hgroup>
                <CardContent className="blog-meta">
                  <ul
                    className="ui-layout-row ui-x-small blog-tags"
                    aria-label="Tags"
                  >
                    <li>
                      <Chip label="Member diaries" size="small" />
                    </li>
                  </ul>
                  <div className="ui-layout-media">
                    <Avatar aria-hidden="true">SN</Avatar>
                    <div>
                      <p>Stella Nut</p>
                      <p className="ui-caption">
                        <time dateTime="2026-09-15">Sep 15, 2026</time>, 7 min
                        read
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card as="article" variant="outlined">
                <div
                  className="blog-cover"
                  style={{ "--hue": "100" }}
                  role="img"
                  aria-label="Cover image for Root notes are a conversation, not a rule"
                ></div>
                <hgroup>
                  <h3 className="ui-h5">
                    <a className="ui-card-link" href="#blog-list-root-notes">
                      Root notes are a conversation, not a rule
                    </a>
                  </h3>
                  <p>
                    Why playing the root should start the fun instead of ending
                    it.
                  </p>
                </hgroup>
                <CardContent className="blog-meta">
                  <ul
                    className="ui-layout-row ui-x-small blog-tags"
                    aria-label="Tags"
                  >
                    <li>
                      <Chip label="Member diaries" size="small" />
                    </li>
                  </ul>
                  <div className="ui-layout-media">
                    <Avatar aria-hidden="true">PG</Avatar>
                    <div>
                      <p>Percy Groove</p>
                      <p className="ui-caption">
                        <time dateTime="2026-09-08">Sep 8, 2026</time>, 6 min
                        read
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card as="article" variant="outlined">
                <div
                  className="blog-cover"
                  style={{ "--hue": "260" }}
                  role="img"
                  aria-label="Cover image for Slapping in drop D after bedtime"
                ></div>
                <hgroup>
                  <h3 className="ui-h5">
                    <a className="ui-card-link" href="#blog-list-drop-d">
                      Slapping in drop D after bedtime
                    </a>
                  </h3>
                  <p>
                    Ghost notes, soft thumbs and the headphones that kept my
                    neighbours asleep.
                  </p>
                </hgroup>
                <CardContent className="blog-meta">
                  <ul
                    className="ui-layout-row ui-x-small blog-tags"
                    aria-label="Tags"
                  >
                    <li>
                      <Chip label="Tabs & tips" size="small" />
                    </li>
                    <li>
                      <Chip label="Technique" size="small" />
                    </li>
                  </ul>
                  <div className="ui-layout-media">
                    <Avatar aria-hidden="true">RR</Avatar>
                    <div>
                      <p>Rory Rootnote</p>
                      <p className="ui-caption">
                        <time dateTime="2026-08-29">Aug 29, 2026</time>, 8 min
                        read
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card as="article" variant="outlined">
                <div
                  className="blog-cover"
                  style={{ "--hue": "160" }}
                  role="img"
                  aria-label="Cover image for My new-drummer onboarding checklist"
                ></div>
                <hgroup>
                  <h3 className="ui-h5">
                    <a className="ui-card-link" href="#blog-list-onboarding">
                      My new-drummer onboarding checklist
                    </a>
                  </h3>
                  <p>
                    The 30-day plan every new drummer in my band gets, from
                    earplugs to first gig.
                  </p>
                </hgroup>
                <CardContent className="blog-meta">
                  <ul
                    className="ui-layout-row ui-x-small blog-tags"
                    aria-label="Tags"
                  >
                    <li>
                      <Chip label="Dear diary" size="small" />
                    </li>
                  </ul>
                  <div className="ui-layout-media">
                    <Avatar aria-hidden="true">AB</Avatar>
                    <div>
                      <p>Ada Bridge</p>
                      <p className="ui-caption">
                        <time dateTime="2026-08-18">Aug 18, 2026</time>, 4 min
                        read
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          </ul>
        </section>
        <Button
          className="blog-more"
          href="#blog-list-page-2"
          variant="outlined"
        >
          Load more posts
        </Button>
      </div>
      <style>{`
        .blog-list {
          container-type: inline-size;

          .blog-header .ui-hgroup {
            flex: 1 1 24rem;
          }

          .blog-cover {
            align-self: stretch;
            aspect-ratio: 2 / 1;
            background-image: linear-gradient(
              135deg,
              oklch(from var(--ui-primary) l c calc(h + var(--hue, 0))),
              oklch(from var(--ui-primary) l c calc(h + var(--hue, 0) + 60))
            );
          }

          .blog-featured {
            .blog-featured-body {
              padding: var(--ui-space-5);
            }

            h2 {
              text-wrap: balance;
            }
          }

          .blog-meta {
            margin-block-start: auto;
          }

          .blog-more {
            align-self: center;
          }

          .blog-tags li {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}
