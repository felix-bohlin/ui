<script setup lang="ts">
import { Avatar, Card, CardContent, Rating } from "opui-css/vue"
</script>

<template>
  <section
    class="testimonials ui-layout-container ui-layout-column ui-gap-large"
    aria-labelledby="testimonials-heading"
  >
    <div
      class="ui-layout-container ui-layout-column ui-align-center testimonials-intro"
      style="--_max-inline-size: 40rem; --_padding-inline: 0"
    >
      <hgroup class="ui-hgroup">
        <p>Member love &lt;3</p>
        <h1 class="ui-h2" id="testimonials-heading">
          Bassists feel heard on Bassbook
        </h1>
        <p>
          From bedroom players to the bassist in a 9-piece ska band, here's what
          our members say.
        </p>
      </hgroup>
      <p class="ui-layout-row ui-align-center">
        <Rating
          aria-hidden="true"
          label="Rated 4.9 out of 5"
          size="small"
          :value="4.9"
        />
        <span
          ><strong>4.9 out of 5</strong> from 2&nbsp;300+ happy bassists</span
        >
      </p>
    </div>
    <ul class="testimonials-list">
      <li>
        <Card variant="outlined">
          <CardContent>
            <figure>
              <Rating label="Rated 5 out of 5" size="small" :value="5" />
              <blockquote>
                <p>
                  I posted my drop D riff on Bassbook and got 40 comments in an
                  hour. My own band has never commented on anything I've played.
                  Woohoo!
                </p>
              </blockquote>
              <figcaption class="ui-layout-media">
                <Avatar aria-hidden="true">EN</Avatar>
                <div>
                  <p class="testimonials-name">Ellen Nut</p>
                  <p class="ui-caption">Bassist, Slap Like Now</p>
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
              <Rating label="Rated 5 out of 5" size="small" :value="5" />
              <blockquote>
                <p>
                  Made my profile in five minutes. It even kept my pedalboard
                  photos in HD.
                </p>
              </blockquote>
              <figcaption class="ui-layout-media">
                <Avatar aria-hidden="true">SH</Avatar>
                <div>
                  <p class="testimonials-name">Scott Humbucker</p>
                  <p class="ui-caption">Bassist, Brad and the Brads</p>
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
              <Rating label="Rated 4 out of 5" size="small" :value="4" />
              <blockquote>
                <p>
                  The gig calendar shows when my band booked a show without me.
                  I wish it could also tell the drummer to turn it down, but
                  it's getting there.
                </p>
              </blockquote>
              <figcaption class="ui-layout-media">
                <Avatar aria-hidden="true">MH</Avatar>
                <div>
                  <p class="testimonials-name">Mohini Hertz</p>
                  <p class="ui-caption">Bassist, Treble Makers</p>
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
              <Rating label="Rated 5 out of 5" size="small" :value="5" />
              <blockquote>
                <p>
                  My Mixed Too Low group meets here every Tuesday. Finally,
                  people who know what a root note is. Totally rad!
                </p>
              </blockquote>
              <figcaption class="ui-layout-media">
                <Avatar aria-hidden="true">AG</Avatar>
                <div>
                  <p class="testimonials-name">Adam Groove</p>
                  <p class="ui-caption">Fretless player, Groove Juice</p>
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
              <Rating label="Rated 5 out of 5" size="small" :value="5" />
              <blockquote>
                <p>
                  Honestly the only place where nobody asks me to turn it down.
                </p>
              </blockquote>
              <figcaption class="ui-layout-media">
                <Avatar aria-hidden="true">KH</Avatar>
                <div>
                  <p class="testimonials-name">Kinga Headstock</p>
                  <p class="ui-caption">Bassist, The Tall Guitarists</p>
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
              <Rating label="Rated 5 out of 5" size="small" :value="5" />
              <blockquote>
                <p>
                  Flatwounds, fretless and five strings were must-haves for me.
                  Bassbook found me three bandmates who actually like all of
                  them. *smooch*
                </p>
              </blockquote>
              <figcaption class="ui-layout-media">
                <Avatar aria-hidden="true">JR</Avatar>
                <div>
                  <p class="testimonials-name">Josh Rootnote</p>
                  <p class="ui-caption">Bassist, Fretless Tal's Bass Barn</p>
                </div>
              </figcaption>
            </figure>
          </CardContent>
        </Card>
      </li>
    </ul>
  </section>
</template>

<style>
.testimonials {
  container-type: inline-size;

  .testimonials-intro h1 {
    text-wrap: balance;
  }

  .testimonials-list {
    column-gap: var(--ui-space-5);
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
      padding-block-end: var(--ui-space-5);
    }

    figure {
      display: grid;
      gap: var(--ui-space-4);
      place-items: normal;
    }
  }

  .testimonials-name {
    font-weight: var(--ui-font-weight-medium);
  }
}
</style>
