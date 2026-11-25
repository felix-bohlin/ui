<script lang="ts">
  import { Button, ControlGroup, Field, Form } from "opui-css/svelte"
</script>

<div
  class="call-to-action ui-layout-container ui-layout-column"
  style="--_gap: var(--ui-space-8); --_max-inline-size: 64rem"
>
  <section
    aria-labelledby="call-to-action-banner-heading"
    class="cta-banner ui-layout-column ui-align-center"
    style="--_gap: var(--ui-space-5)"
  >
    <h2 id="call-to-action-banner-heading">Your next band is one post away</h2>
    <p>
      Drummers are looking for you right now. Probably. Make a profile in two
      minutes and let them find you.
    </p>
    <Button href="#call-to-action-join" size="large" variant="filled">
      Make my profile
    </Button>
  </section>
  <section
    aria-labelledby="call-to-action-split-heading"
    class="cta-split ui-layout-columns"
    style="--_columns: 1fr 1fr; --_gap: var(--ui-space-6)"
  >
    <hgroup class="ui-hgroup">
      <h2 class="ui-h4" id="call-to-action-split-heading">
        Get the gig list every Friday
      </h2>
      <p>Open jams, auditions and bands that need a bassist near you.</p>
    </hgroup>
    <Form action="#" class="cta-form" id="call-to-action-form">
      <ControlGroup>
        <Field for="call-to-action-email">
          <input
            aria-label="Email"
            autocomplete="email"
            id="call-to-action-email"
            name="email"
            placeholder="you@lowend.example"
            required
            type="email"
          />
        </Field>
        <Button type="submit" variant="filled">Sign me up</Button>
      </ControlGroup>
    </Form>
  </section>
</div>

<style>
  :global {
    .call-to-action {
      container-type: inline-size;

      .cta-banner {
        align-items: center;
        background-color: var(--ui-primary);
        background-image:
          radial-gradient(
            circle at 100% 0,
            oklch(from var(--ui-on-primary) l c h / 22%),
            transparent 40%
          ),
          radial-gradient(
            circle at 0 100%,
            oklch(from var(--ui-on-primary) l c h / 14%),
            transparent 45%
          );
        border-radius: var(--ui-radius);
        color: var(--ui-on-primary);
        padding: var(--ui-space-8) var(--ui-space-6);
        text-align: center;

        @container (inline-size >= 48rem) {
          padding-inline: var(--ui-space-8);
        }

        h2 {
          font-size: clamp(
            var(--ui-font-size-700),
            5cqi,
            var(--ui-font-size-800)
          );
          letter-spacing: var(--ui-letter-spacing-heading);
          line-height: var(--ui-line-height-tight);
          text-wrap: balance;
        }

        p {
          max-inline-size: 36rem;
        }

        .ui-button {
          --_accent-filled: var(--ui-surface);
          --_on-accent-filled: var(--ui-text-strong);
        }
      }

      .cta-split {
        align-items: center;
        border: var(--ui-border-width) solid var(--ui-border-color);
        border-radius: var(--ui-radius);
        padding: var(--ui-space-6);
      }

      .cta-form {
        inline-size: 100%;
      }
    }
  }
</style>
