<script lang="ts">
  import {
    Button,
    Card,
    CardContent,
    Field,
    List,
    ListItem,
    Tabs,
    TabsItem,
    TabsLabel,
    TabsPanel,
    ToggleButton,
  } from "opui-css/svelte"
</script>

<div
  class="music-player ui-layout-container ui-layout-columns ui-gap-large"
  style="--_columns: 2fr 3fr; --_max-inline-size: 60rem"
>
  <Card
    aria-labelledby="music-player-heading"
    as="section"
    class="mp-now"
    variant="outlined"
  >
    <h1 class="ui-sr-only" id="music-player-heading">Now playing</h1>
    <CardContent>
      <div
        aria-label="Cover of Deep End by The Flatwounds: a black record with a glowing centre"
        class="mp-cover"
        role="img"
      ></div>
      <div class="ui-layout-row ui-spread mp-track">
        <hgroup class="ui-hgroup">
          <h2 class="ui-h4">Root Note Romance</h2>
          <p>The Flatwounds, Deep End</p>
        </hgroup>
        <ToggleButton
          aria-label="Like Root Note Romance"
          defaultChecked
          name="music-player-like"
        >
          <svg
            data-icon="heart"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"
            ></path>
          </svg>
        </ToggleButton>
      </div>
      <div class="mp-seek">
        <Field for="music-player-position">
          <input
            aria-label="Position"
            aria-valuetext="1 minute 42 seconds of 3 minutes 58 seconds"
            id="music-player-position"
            max="238"
            min="0"
            name="position"
            type="range"
            value="102"
          />
        </Field>
        <p class="ui-layout-row ui-spread ui-caption ui-tabular-nums">
          <span>1:42</span><span>3:58</span>
        </p>
      </div>
      <div class="ui-layout-row mp-controls">
        <Button
          aria-label="Previous track"
          round
          type="button"
          variant="transparent"
        >
          <svg
            data-icon="chevron-left"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            ></path>
          </svg>
        </Button>
        <Button
          aria-label="Play"
          class="mp-play"
          round
          size="large"
          type="button"
          variant="transparent"
        >
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
        </Button>
        <Button
          aria-label="Next track"
          round
          type="button"
          variant="transparent"
        >
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
              d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
            ></path>
          </svg>
        </Button>
      </div>
      <Field for="music-player-volume" label="Volume">
        <input
          aria-valuetext="70%"
          id="music-player-volume"
          name="volume"
          type="range"
          value="70"
        />
      </Field>
    </CardContent>
  </Card>
  <Tabs class="mp-side" name="music-player-side" variant="line">
    <TabsItem defaultChecked id="music-player-tab-queue">
      <TabsLabel>Up next</TabsLabel>
      <TabsPanel>
        <List as="ol" bordered class="mp-queue" variant="transparent">
          <ListItem description="Sub Club" label="Chest Cavity Dub">
            {#snippet end()}
              <span class="ui-tabular-nums">5:12</span>
            {/snippet}
          </ListItem>
          <ListItem description="Drop D Dynasty" label="Tuned Down, Turned Up">
            {#snippet end()}
              <span class="ui-tabular-nums">2:47</span>
            {/snippet}
          </ListItem>
          <ListItem description="Stella Nut" label="Thumb Thing Special">
            {#snippet end()}
              <span class="ui-tabular-nums">3:09</span>
            {/snippet}
          </ListItem>
          <ListItem description="Holly Humbucker" label="Fretless Lullaby">
            {#snippet end()}
              <span class="ui-tabular-nums">4:05</span>
            {/snippet}
          </ListItem>
          <ListItem
            description="The Flatwounds"
            label="Walking Bass, Running Late"
          >
            {#snippet end()}
              <span class="ui-tabular-nums">3:21</span>
            {/snippet}
          </ListItem>
        </List>
      </TabsPanel>
    </TabsItem>
    <TabsItem id="music-player-tab-lyrics">
      <TabsLabel>Lyrics</TabsLabel>
      <TabsPanel>
        <div class="mp-lyrics">
          <p>I found you on the lowest string</p>
          <p>You didn't say a single thing</p>
          <p class="mp-lyric-current">But baby, you were in the pocket</p>
          <p>And I could feel it in my chest</p>
          <p>The guitar player thinks he's best</p>
          <p>But you and me, we hold the rest</p>
        </div>
      </TabsPanel>
    </TabsItem>
  </Tabs>
</div>

<style>
  :global {
    .music-player {
      container-type: inline-size;

      .mp-now {
        .ui-content {
          display: grid;
          gap: var(--ui-space-5);
        }
      }

      .mp-cover {
        aspect-ratio: 1;
        background-color: oklch(0.2 0.01 260);
        background-image:
          repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0 0.35rem,
            oklch(1 0 0 / 8%) 0.35rem 0.4rem
          ),
          radial-gradient(
            circle at 50% 50%,
            var(--ui-primary) 0 18%,
            oklch(0.2 0.01 260) 18.5% 20%,
            transparent 20.5%
          ),
          conic-gradient(
            from 200deg,
            oklch(from var(--ui-primary) l c h / 40%),
            transparent 30%,
            oklch(from var(--ui-warning) l c h / 30%) 60%,
            transparent 80%
          );
        border-radius: var(--ui-radius-large);
        box-shadow: var(--ui-shadow-elevated);
        inline-size: min(100%, 22rem);
        justify-self: center;
      }

      .mp-track {
        align-items: start;
      }

      .mp-seek {
        display: grid;
        gap: var(--ui-space-1);
      }

      .mp-play {
        --_icon-size: var(--ui-button-size-large);

        color: var(--ui-primary-text);

        svg {
          block-size: var(--_icon-size);
          inline-size: var(--_icon-size);
        }
      }

      .mp-controls {
        justify-content: center;
      }

      .mp-side {
        align-self: start;
      }

      .mp-queue .ui-tabular-nums {
        color: var(--ui-text-subtle);
      }

      .mp-lyrics {
        display: grid;
        font-size: var(--ui-font-size-large);
        gap: var(--ui-space-3);

        .mp-lyric-current {
          color: var(--ui-primary-text);
          font-weight: var(--ui-font-weight-bold);
        }

        p:not(.mp-lyric-current) {
          color: var(--ui-text-subtle);
        }
      }
    }
  }
</style>
