<script lang="ts">
  import { Button, Card, CardContent, Checkbox, Chip } from "opui-css/svelte"
</script>

<div
  class="setlist ui-layout-container ui-layout-columns"
  style="--_columns: 3fr 2fr; --_gap: var(--ui-space-12); --_max-inline-size: 64rem"
>
  <article aria-labelledby="setlist-title" class="sl-paper ui-light">
    <hgroup class="ui-hgroup">
      <h1 class="sl-title" id="setlist-title">The Flatwounds</h1>
      <p>Harbour Stage, Saturday 12 June, 22:00</p>
    </hgroup>
    <ol aria-label="Songs" class="sl-songs">
      <li class="sl-song">
        <Checkbox defaultChecked name="setlist-song-1"
          >Root Note Romance</Checkbox
        >
        <span class="sl-meta ui-caption ui-tabular-nums"
          ><span class="sl-key">E</span><span>96 BPM</span></span
        >
        <span class="sl-note ui-caption">Scott counts in</span>
      </li>
      <li class="sl-song">
        <Checkbox defaultChecked name="setlist-song-2"
          >Chest Cavity Dub</Checkbox
        >
        <span class="sl-meta ui-caption ui-tabular-nums"
          ><span class="sl-key">A</span><span>72 BPM</span></span
        >
        <span class="sl-note ui-caption">Long intro, keep it dark</span>
      </li>
      <li class="sl-song">
        <Checkbox defaultChecked name="setlist-song-3"
          >Tuned Down, Turned Up</Checkbox
        >
        <span class="sl-meta ui-caption ui-tabular-nums"
          ><span class="sl-key">D</span><span>140 BPM</span></span
        >
        <span class="sl-note ui-caption">Drop D, retune before</span>
      </li>
      <li class="sl-song">
        <Checkbox name="setlist-song-4">Thumb Thing Special</Checkbox>
        <span class="sl-meta ui-caption ui-tabular-nums"
          ><span class="sl-key">G</span><span>118 BPM</span></span
        >
      </li>
      <li class="sl-song">
        <Checkbox name="setlist-song-5">Walking Bass, Running Late</Checkbox>
        <span class="sl-meta ui-caption ui-tabular-nums"
          ><span class="sl-key">C</span><span>160 BPM</span></span
        >
        <span class="sl-note ui-caption">Swing it</span>
      </li>
      <li class="sl-song">
        <Checkbox name="setlist-song-6">Fretless Lullaby</Checkbox>
        <span class="sl-meta ui-caption ui-tabular-nums"
          ><span class="sl-key">F#</span><span>64 BPM</span></span
        >
        <span class="sl-note ui-caption">Fretless, lights down</span>
      </li>
    </ol>
    <p aria-hidden="true" class="sl-encore">Encore</p>
    <ol
      aria-label="Encore"
      class="sl-songs"
      start="7"
      style="counter-reset: sl-song 6"
    >
      <li class="sl-song">
        <Checkbox name="setlist-song-7">Mixed Too Low, Part 2</Checkbox>
        <span class="sl-meta ui-caption ui-tabular-nums"
          ><span class="sl-key">E</span><span>104 BPM</span></span
        >
        <span class="sl-note ui-caption">Everyone on stage</span>
      </li>
    </ol>
  </article>
  <div class="ui-layout-column" style="--_gap: var(--ui-space-7)">
    <Card
      aria-labelledby="setlist-summary-heading"
      as="section"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="setlist-summary-heading">Tonight</h2>
        <p>3 of 7 played, about 24 minutes to go.</p>
      </hgroup>
      <CardContent class="ui-layout-row ui-gap-small">
        <Chip as="span" dot label="On stage" severity="success" size="small" />
        <Chip as="span" label="Curfew 23:45" size="small" />
      </CardContent>
    </Card>
    <Card
      aria-labelledby="setlist-stage-heading"
      as="section"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="setlist-stage-heading">Stage plot</h2>
        <p>Audience at the bottom.</p>
      </hgroup>
      <CardContent>
        <ul aria-labelledby="setlist-stage-heading" class="sl-stage">
          <li style="grid-area: drums">Drums</li>
          <li style="grid-area: keys">Keys</li>
          <li class="sl-you" style="grid-area: bass">Bass, you</li>
          <li style="grid-area: guitar">Guitar</li>
          <li style="grid-area: vox">Vocals</li>
          <li style="grid-area: mon">Monitors</li>
        </ul>
      </CardContent>
    </Card>
    <Button type="button" variant="outlined">
      <svg
        data-icon="print"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3m-3 11H8v-5h8zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-1-9H6v4h12z"
        ></path>
      </svg>
      <span class="ui-text">Print for the stage floor</span>
    </Button>
  </div>
</div>

<style>
  :global {
    .setlist {
      container-type: inline-size;

      .sl-paper {
        background-color: oklch(0.97 0.025 90);
        background-image: linear-gradient(
          to right,
          transparent calc(var(--ui-space-7) - 2px),
          oklch(from var(--ui-critical) l c h / 35%)
            calc(var(--ui-space-7) - 2px) var(--ui-space-7),
          transparent var(--ui-space-7)
        );
        border-radius: var(--ui-radius-small);
        box-shadow: var(--ui-shadow-elevated);
        color: var(--ui-text-strong);
        padding: var(--ui-space-12) var(--ui-space-7) var(--ui-space-7)
          var(--ui-space-12);
        position: relative;
        rotate: -0.6deg;

        &::before,
        &::after {
          background-color: oklch(from var(--ui-warning) 0.9 0.06 h / 70%);
          block-size: 1.75rem;
          content: "";
          inline-size: 6rem;
          inset-block-start: -0.75rem;
          position: absolute;
        }

        &::before {
          inset-inline-start: 10%;
          rotate: -4deg;
        }

        &::after {
          inset-inline-end: 10%;
          rotate: 5deg;
        }
      }

      .sl-title {
        font-size: var(--ui-font-size-700);
        font-weight: var(--ui-font-weight-heading);
        letter-spacing: var(--ui-letter-spacing-caps);
        line-height: var(--ui-line-height-tight);
        text-transform: uppercase;
      }

      .sl-songs {
        counter-reset: sl-song;
        display: grid;
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .sl-song {
        align-items: baseline;
        column-gap: var(--ui-space-4);
        counter-increment: sl-song;
        display: grid;
        grid-template-columns: 1.75rem minmax(0, 1fr) auto;
        min-block-size: 2.5rem;
        padding-block: var(--ui-space-1);

        &::before {
          content: counter(sl-song) ".";
          font-variant-numeric: tabular-nums;
          font-weight: var(--ui-font-weight-heading);
        }

        .ui-checkbox {
          font-size: var(--ui-font-size-large);
          font-weight: var(--ui-font-weight-label);
        }

        &:has(:checked) .ui-checkbox {
          text-decoration: line-through;
          text-decoration-thickness: 2px;
        }
      }

      .sl-meta {
        color: var(--ui-text-subtle);
        display: flex;
        gap: var(--ui-space-4);
      }

      .sl-key {
        font-weight: var(--ui-font-weight-heading);
      }

      .sl-note {
        color: var(--ui-critical-text);
        font-style: italic;
        grid-column: 2 / -1;
      }

      .sl-encore {
        border-block-start: var(--ui-border-width-large) dashed
          var(--ui-text-subtle);
        font-weight: var(--ui-font-weight-heading);
        letter-spacing: var(--ui-letter-spacing-caps);
        margin-block: var(--ui-space-5) var(--ui-space-2);
        padding-block-start: var(--ui-space-4);
        text-transform: uppercase;
      }

      .sl-stage {
        aspect-ratio: 4 / 3;
        display: grid;
        gap: var(--ui-space-2);
        grid-template-areas:
          ". drums drums ."
          "keys bass guitar vox"
          "mon mon mon mon";
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-template-rows: 1.2fr 1fr 0.5fr;
        list-style-type: none;
        margin-block: 0;
        margin-inline: auto;
        max-inline-size: 22rem;
        padding: 0;

        li {
          align-items: center;
          background-color: var(--ui-surface-tonal);
          border-radius: var(--ui-radius-small);
          display: grid;
          font-size: var(--ui-font-size-caption);
          font-weight: var(--ui-font-weight-label);
          justify-content: center;
          text-align: center;
        }

        .sl-you {
          background-color: var(--ui-primary);
          color: var(--ui-on-primary);
        }
      }
    }
  }
</style>
