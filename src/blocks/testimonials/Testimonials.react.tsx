import { Avatar, Card, CardContent, Rating } from "opui-css/react"

export default function Testimonials() {
  return (
    <>
      <section
        className="testimonials ui-layout-container ui-layout-column ui-large"
        aria-labelledby="testimonials-heading"
      >
        <div
          className="ui-layout-container ui-layout-column ui-align-center testimonials-intro"
          style={{ "--_max-inline-size": "40rem", "--_padding-inline": "0" }}
        >
          <hgroup className="ui-hgroup">
            <p>Member love &lt;3</p>
            <h1 className="ui-h2" id="testimonials-heading">
              Bassists feel heard on Bassbook
            </h1>
            <p>
              From bedroom players to the bassist in a 9-piece ska band, here's
              what our members say.
            </p>
          </hgroup>
          <p className="ui-layout-row ui-align-center">
            <Rating
              aria-hidden="true"
              defaultValue={4.9}
              label="Rated 4.9 out of 5"
              size="small"
            />
            <span>
              <strong>4.9 out of 5</strong> from 2&nbsp;300+ happy bassists
            </span>
          </p>
        </div>
        <ul className="testimonials-list">
          <li>
            <Card variant="outlined">
              <CardContent>
                <figure>
                  <Rating
                    defaultValue={5}
                    label="Rated 5 out of 5"
                    size="small"
                  />
                  <blockquote>
                    <p>
                      I posted my drop D riff on Bassbook and got 40 comments in
                      an hour. My own band has never commented on anything I've
                      played. Woohoo!
                    </p>
                  </blockquote>
                  <figcaption className="ui-layout-media">
                    <Avatar aria-hidden="true">SN</Avatar>
                    <div>
                      <p className="testimonials-name">Stella Nut</p>
                      <p className="ui-caption">Bassist, The Low Enders</p>
                    </div>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </li>
          <li>
            <Card variant="outlined">
              <CardContent>
                <figure>
                  <Rating
                    defaultValue={5}
                    label="Rated 5 out of 5"
                    size="small"
                  />
                  <blockquote>
                    <p>
                      Made my profile in five minutes. It even kept my
                      pedalboard photos in HD.
                    </p>
                  </blockquote>
                  <figcaption className="ui-layout-media">
                    <Avatar aria-hidden="true">HH</Avatar>
                    <div>
                      <p className="testimonials-name">Holly Humbucker</p>
                      <p className="ui-caption">Bassist, Brad and the Brads</p>
                    </div>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </li>
          <li>
            <Card variant="outlined">
              <CardContent>
                <figure>
                  <Rating
                    defaultValue={4}
                    label="Rated 4 out of 5"
                    size="small"
                  />
                  <blockquote>
                    <p>
                      The gig calendar shows when my band booked a show without
                      me. I wish it could also tell the drummer to turn it down,
                      but it's getting there.
                    </p>
                  </blockquote>
                  <figcaption className="ui-layout-media">
                    <Avatar aria-hidden="true">IH</Avatar>
                    <div>
                      <p className="testimonials-name">Ines Hertz</p>
                      <p className="ui-caption">Bassist, Treble Makers</p>
                    </div>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </li>
          <li>
            <Card variant="outlined">
              <CardContent>
                <figure>
                  <Rating
                    defaultValue={5}
                    label="Rated 5 out of 5"
                    size="small"
                  />
                  <blockquote>
                    <p>
                      My Ignored Bassists Anonymous group meets here every
                      Tuesday. Finally, people who know what a root note is.
                      Totally rad!
                    </p>
                  </blockquote>
                  <figcaption className="ui-layout-media">
                    <Avatar aria-hidden="true">PG</Avatar>
                    <div>
                      <p className="testimonials-name">Percy Groove</p>
                      <p className="ui-caption">
                        Fretless player, Groove Juice
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </li>
          <li>
            <Card variant="outlined">
              <CardContent>
                <figure>
                  <Rating
                    defaultValue={5}
                    label="Rated 5 out of 5"
                    size="small"
                  />
                  <blockquote>
                    <p>
                      Honestly the only place where nobody asks me to turn it
                      down.
                    </p>
                  </blockquote>
                  <figcaption className="ui-layout-media">
                    <Avatar aria-hidden="true">LH</Avatar>
                    <div>
                      <p className="testimonials-name">Lou Headstock</p>
                      <p className="ui-caption">Bassist, The Tall Guitarists</p>
                    </div>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </li>
          <li>
            <Card variant="outlined">
              <CardContent>
                <figure>
                  <Rating
                    defaultValue={5}
                    label="Rated 5 out of 5"
                    size="small"
                  />
                  <blockquote>
                    <p>
                      Flatwounds, fretless and five strings were must-haves for
                      me. Bassbook found me three bandmates who actually like
                      all of them. *smooch*
                    </p>
                  </blockquote>
                  <figcaption className="ui-layout-media">
                    <Avatar aria-hidden="true">RR</Avatar>
                    <div>
                      <p className="testimonials-name">Rory Rootnote</p>
                      <p className="ui-caption">
                        Bassist, Fretless Fiona's Bass Barn
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </li>
        </ul>
      </section>
      <style>{`
        .testimonials {
          container-type: inline-size;

          .testimonials-intro h1 {
            text-wrap: balance;
          }

          .testimonials-list {
            column-gap: var(--ui-space-4);
            columns: 1;
            list-style-type: none;
            padding: 0;

            @container (inline-size >= 40rem) {
              columns: 2;
            }

            @container (inline-size >= 56rem) {
              columns: 3;
            }

            li {
              break-inside: avoid;
              padding-block-end: var(--ui-space-4);
            }

            figure {
              display: grid;
              gap: var(--ui-space-3);
            }
          }

          .testimonials-name {
            font-weight: var(--ui-font-weight-medium);
          }
        }
      `}</style>
    </>
  )
}
