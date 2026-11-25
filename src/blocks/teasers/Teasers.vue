<script setup lang="ts">
import { Button, Chip } from "opui-css/vue"
</script>

<template>
  <div
    class="teasers ui-layout-container ui-layout-column"
    style="--_gap: var(--ui-space-8); --_max-inline-size: 68rem"
  >
    <hgroup class="ui-hgroup teasers-intro">
      <p class="ui-overline">From the tour van</p>
      <h1 class="ui-h2">Stories from the road</h1>
      <p>Three bands, three trips, one shared love of the low end.</p>
    </hgroup>
    <article
      aria-labelledby="teasers-fjord"
      class="teaser ui-layout-columns"
      style="--_columns: 1fr 1fr; --_gap: var(--ui-space-8)"
    >
      <div aria-hidden="true" class="teaser-media" style="--_shift: 0"></div>
      <div class="teaser-copy ui-layout-column">
        <Chip as="span" label="Tour diary" size="small" />
        <h2 class="ui-h3" id="teasers-fjord">A gig at the end of the fjord</h2>
        <p>
          The Flatwounds drove six hours on a road with more bends than a
          fretless solo to play for 40 people and a goat. The goat stayed for
          the encore.
        </p>
        <Button href="#teasers-fjord-story" variant="outlined">
          <span class="ui-text">Read the tour diary</span>
          <svg
            data-icon="arrow-right"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4l4.29-4.3H4a1 1 0 1 1 0-2h13.59l-4.3-4.3a1 1 0 0 1 0-1.4"
            ></path>
          </svg>
        </Button>
      </div>
    </article>
    <article
      aria-labelledby="teasers-lighthouse"
      class="teaser teaser-reverse ui-layout-columns"
      style="--_columns: 1fr 1fr; --_gap: var(--ui-space-8)"
    >
      <div aria-hidden="true" class="teaser-media" style="--_shift: 140"></div>
      <div class="teaser-copy ui-layout-column">
        <Chip as="span" label="Rehearsal spaces" size="small" />
        <h2 class="ui-h3" id="teasers-lighthouse">
          Rehearsing in a lighthouse
        </h2>
        <p>
          No neighbours, perfect natural reverb and 117 steps to carry the amp
          up. Sub Club on why their new album was recorded one floor below the
          lamp.
        </p>
        <Button href="#teasers-lighthouse-story" variant="outlined">
          <span class="ui-text">Climb the lighthouse</span>
          <svg
            data-icon="arrow-right"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4l4.29-4.3H4a1 1 0 1 1 0-2h13.59l-4.3-4.3a1 1 0 0 1 0-1.4"
            ></path>
          </svg>
        </Button>
      </div>
    </article>
    <article
      aria-labelledby="teasers-camp"
      class="teaser ui-layout-columns"
      style="--_columns: 1fr 1fr; --_gap: var(--ui-space-8)"
    >
      <div aria-hidden="true" class="teaser-media" style="--_shift: 220"></div>
      <div class="teaser-copy ui-layout-column">
        <Chip as="span" label="Gear test" size="small" />
        <h2 class="ui-h3" id="teasers-camp">What cold does to your strings</h2>
        <p>
          Holly took three sets of strings to a snowy base camp and played them
          at minus 18. Two of them survived. Her fingers, mostly.
        </p>
        <Button href="#teasers-camp-story" variant="outlined">
          <span class="ui-text">See the gear test</span>
          <svg
            data-icon="arrow-right"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4l4.29-4.3H4a1 1 0 1 1 0-2h13.59l-4.3-4.3a1 1 0 0 1 0-1.4"
            ></path>
          </svg>
        </Button>
      </div>
    </article>
  </div>
</template>

<style>
.teasers {
  container-type: inline-size;

  .teasers-intro {
    text-align: center;
  }

  .teaser {
    align-items: center;
  }

  .teaser-media {
    --_far: oklch(from var(--ui-primary) 0.62 0.09 calc(h + var(--_shift, 0)));
    --_near: oklch(from var(--ui-primary) 0.36 0.08 calc(h + var(--_shift, 0)));
    --_sky: oklch(from var(--ui-primary) 0.86 0.07 calc(h + var(--_shift, 0)));
    --_sun: oklch(
      from var(--ui-primary) 0.96 0.09 calc(h + var(--_shift, 0) + 60)
    );

    aspect-ratio: 16 / 9;

    background-color: var(--_sky);
    background-image:
      conic-gradient(from 135deg at 50% 40%, var(--_near) 90deg, transparent 0),
      conic-gradient(from 135deg at 50% 25%, var(--_far) 90deg, transparent 0),
      radial-gradient(circle at 72% 28%, var(--_sun) 0 7%, transparent 7.5%),
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
  }

  .teaser-copy {
    align-items: start;
  }

  @container (inline-size >= 56rem) {
    .teaser-media {
      aspect-ratio: 4 / 3;
    }

    .teaser-reverse .teaser-media {
      order: 2;
    }
  }
}
</style>
