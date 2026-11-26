<script setup lang="ts">
import {
  Button,
  Card,
  CardContent,
  Chip,
  Field,
  ToggleButton,
  ToggleGroup,
} from "opui-css/vue"
</script>

<template>
  <div
    class="tuner ui-layout-container ui-layout-columns"
    style="
      --_columns: 3fr 2fr;
      --_gap: var(--ui-space-6);
      --_max-inline-size: 60rem;
    "
  >
    <Card
      aria-labelledby="tuner-heading"
      as="section"
      class="tn-tuner"
      variant="outlined"
    >
      <CardContent>
        <h1 class="ui-overline" id="tuner-heading">Tuner</h1>
        <div aria-hidden="true" class="tn-gauge"></div>
        <p class="tn-note" role="status">
          <span aria-hidden="true">E</span
          ><span class="ui-sr-only">E string, 6 cents flat</span>
        </p>
        <Chip as="span" dot label="6 cents flat" severity="warning" />
        <p class="ui-caption">Low E, 41.2 Hz. Tighten a little.</p>
        <ToggleGroup aria-label="String" name="tuner-string">
          <ToggleButton label="B" value="b" />
          <ToggleButton checked label="E" value="e" />
          <ToggleButton label="A" value="a" />
          <ToggleButton label="D" value="d" />
          <ToggleButton label="G" value="g" />
        </ToggleGroup>
      </CardContent>
    </Card>
    <Card
      aria-labelledby="tuner-metronome-heading"
      as="section"
      class="tn-metronome"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="tuner-metronome-heading">Metronome</h2>
        <p>Lock in before you lock in.</p>
      </hgroup>
      <CardContent>
        <p class="tn-bpm">96 <span class="ui-caption">BPM</span></p>
        <Field for="tuner-tempo" label="Tempo">
          <input
            aria-valuetext="96 beats per minute"
            id="tuner-tempo"
            max="240"
            min="40"
            name="tempo"
            type="range"
            :value.attr="'96'"
          />
        </Field>
        <ol aria-label="Beat 1 of 4" class="tn-beats">
          <li class="tn-beat-now"></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <ToggleGroup
          aria-label="Time signature"
          name="tuner-signature"
          size="small"
        >
          <ToggleButton label="3/4" value="3-4" />
          <ToggleButton checked label="4/4" value="4-4" />
          <ToggleButton label="6/8" value="6-8" />
        </ToggleGroup>
        <div class="ui-layout-row ui-gap-small">
          <Button type="button" variant="filled">
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
            <span class="ui-text">Start</span>
          </Button>
          <Button type="button" variant="outlined">Tap tempo</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style>
.tuner {
  container-type: inline-size;

  .tn-tuner .ui-content {
    display: grid;
    gap: var(--ui-space-5);
    justify-items: center;
    text-align: center;
  }

  .tn-gauge {
    aspect-ratio: 2 / 1;
    background-image: radial-gradient(
      circle at 50% 100%,
      var(--ui-text-strong) 0 0.5rem,
      transparent 0.55rem
    );
    inline-size: min(100%, 22rem);
    position: relative;

    &::before {
      background-image:
        conic-gradient(
          from -90deg at 50% 100%,
          oklch(from var(--ui-critical) l c h / 35%) 0 40deg,
          oklch(from var(--ui-warning) l c h / 35%) 40deg 81deg,
          oklch(from var(--ui-success) l c h / 45%) 81deg 99deg,
          oklch(from var(--ui-warning) l c h / 35%) 99deg 140deg,
          oklch(from var(--ui-critical) l c h / 35%) 140deg 180deg,
          transparent 180deg
        ),
        repeating-conic-gradient(
          from -90deg at 50% 100%,
          var(--ui-border-color) 0 0.6deg,
          transparent 0.6deg 9deg
        );
      border-start-end-radius: 999rem;
      border-start-start-radius: 999rem;
      content: "";
      inset: 0;
      mask-image: radial-gradient(
        circle at 50% 100%,
        transparent 0 55%,
        black 56%
      );
      position: absolute;
    }

    &::after {
      background-color: var(--ui-text-strong);
      block-size: 92%;
      border-radius: var(--ui-radius-round);
      content: "";
      inline-size: 3px;
      inset-block-end: 0;
      inset-inline-start: calc(50% - 1.5px);
      position: absolute;
      rotate: -12deg;
      transform-origin: 50% 100%;
    }
  }

  .tn-note {
    color: var(--ui-text-strong);
    font-size: 5rem;
    font-weight: var(--ui-font-weight-bold);
    line-height: 1;
  }

  .tn-bpm {
    color: var(--ui-text-strong);
    font-size: var(--ui-font-size-900);
    font-variant-numeric: tabular-nums;
    font-weight: var(--ui-font-weight-bold);
    line-height: 1;
  }

  .tn-beats {
    display: flex;
    gap: var(--ui-space-3);
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      background-color: var(--ui-surface-tonal);
      block-size: 1rem;
      border-radius: var(--ui-radius-round);
      inline-size: 1rem;
    }

    .tn-beat-now {
      background-color: var(--ui-primary);
      box-shadow: 0 0 0 0.375rem oklch(from var(--ui-primary) l c h / 25%);
    }
  }

  .tn-metronome .ui-content {
    display: grid;
    gap: var(--ui-space-5);
  }
}
</style>
