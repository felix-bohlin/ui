<script lang="ts">
  import {
    Button,
    Chip,
    ControlGroup,
    Field,
    Form,
    List,
    ListItem,
    Stat,
  } from "opui-css/svelte"
</script>

<div class="album-launch ui-dark">
  <div
    class="al-inner ui-layout-container ui-layout-columns"
    style="--_columns: 1fr 1.2fr; --_gap: var(--ui-space-12); --_max-inline-size: 64rem"
  >
    <div aria-hidden="true" class="al-art"></div>
    <div class="ui-layout-column" style="--_gap: var(--ui-space-6)">
      <hgroup class="ui-hgroup">
        <p class="ui-overline">The Flatwounds, new album</p>
        <h1 class="al-title">Deep End</h1>
      </hgroup>
      <p id="album-launch-countdown-label">
        Out everywhere on <time datetime="2027-01-15">Friday 15 January</time>.
        It drops in:
      </p>
      <ul aria-labelledby="album-launch-countdown-label" class="al-countdown">
        <li><Stat label="Days" size="large">03</Stat></li>
        <li><Stat label="Hours" size="large">14</Stat></li>
        <li><Stat label="Minutes" size="large">27</Stat></li>
        <li><Stat label="Seconds" size="large">09</Stat></li>
      </ul>
      <Form action="#" class="al-form" id="album-launch-form">
        <ControlGroup>
          <Field for="album-launch-email">
            <input
              aria-label="Email"
              autocomplete="email"
              id="album-launch-email"
              name="email"
              placeholder="Your email"
              required
              type="email"
            />
          </Field>
          <Button type="submit" variant="filled">Pre-save</Button>
        </ControlGroup>
      </Form>
      <section aria-labelledby="album-launch-tracks-heading">
        <h2 class="ui-overline" id="album-launch-tracks-heading">
          First listen
        </h2>
        <List as="ol" flush variant="transparent">
          <ListItem
            description="Single, out now, 3:58"
            label="Root Note Romance"
          >
            {#snippet end()}
              <Button
                aria-label="Play Root Note Romance"
                round
                size="small"
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
            {/snippet}
          </ListItem>
          <ListItem
            description="Out 15 January"
            label="Walking Bass, Running Late"
          >
            {#snippet end()}
              <Chip as="span" label="Locked" size="small">
                {#snippet start()}
                  <svg
                    data-icon="lock"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"
                    ></path>
                  </svg>
                {/snippet}
              </Chip>
            {/snippet}
          </ListItem>
        </List>
      </section>
    </div>
  </div>
</div>

<style>
  :global {
    .album-launch {
      background-color: oklch(from var(--ui-primary) 0.18 0.05 h);
      background-image:
        radial-gradient(
          ellipse 60% 50% at 80% 0,
          oklch(from var(--ui-primary) 0.45 0.15 calc(h + 40) / 60%),
          transparent
        ),
        radial-gradient(
          ellipse 50% 60% at 0 100%,
          oklch(from var(--ui-primary) 0.4 0.14 calc(h + 280) / 50%),
          transparent
        );
      border-radius: var(--ui-radius-large);
      container-type: inline-size;
      padding: var(--ui-space-12) var(--ui-space-7);

      @container (inline-size >= 48rem) {
        padding: var(--ui-space-12);
      }

      .al-inner {
        align-items: center;
      }

      .al-art {
        aspect-ratio: 1;
        background-color: oklch(0.14 0.01 260);
        background-image:
          radial-gradient(
            circle,
            oklch(from var(--ui-primary) 0.7 0.17 h) 0 16%,
            oklch(0.14 0.01 260) 16.5% 19%,
            transparent 19.5%
          ),
          repeating-radial-gradient(
            circle,
            transparent 0 0.3rem,
            oklch(1 0 0 / 7%) 0.3rem 0.35rem
          ),
          conic-gradient(
            from 30deg,
            transparent,
            oklch(1 0 0 / 12%) 10%,
            transparent 20%,
            transparent 50%,
            oklch(1 0 0 / 12%) 60%,
            transparent 70%
          );
        border-radius: var(--ui-radius-round);
        box-shadow:
          0 2rem 4rem oklch(0 0 0 / 50%),
          0 0 0 0.75rem oklch(1 0 0 / 4%);
        inline-size: min(100%, 22rem);
        justify-self: center;
      }

      .al-title {
        color: var(--ui-text-strong);
        font-size: clamp(var(--ui-font-size-800), 10cqi, 5.5rem);
        letter-spacing: var(--ui-letter-spacing-display);
        line-height: 0.95;
        text-transform: uppercase;
      }

      .al-countdown {
        display: grid;
        gap: var(--ui-space-3);
        grid-template-columns: repeat(4, minmax(0, 1fr));
        list-style-type: none;
        margin: 0;
        max-inline-size: 28rem;
        padding: 0;

        li {
          background-color: oklch(1 0 0 / 8%);
          border: var(--ui-border-width) solid oklch(1 0 0 / 14%);
          border-radius: var(--ui-radius);
          display: grid;
          justify-items: center;
          padding: var(--ui-space-3) var(--ui-space-2);
        }
      }

      .al-form {
        max-inline-size: 28rem;
      }
    }
  }
</style>
