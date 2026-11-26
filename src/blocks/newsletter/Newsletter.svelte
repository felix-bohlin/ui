<script lang="ts">
  import {
    Button,
    Card,
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    List,
    ListItem,
    ToggleButton,
    ToggleGroup,
  } from "opui-css/svelte"
</script>

<div class="newsletter ui-layout-container" style="--_max-inline-size: 64rem">
  <Card
    class="ui-layout-columns newsletter-card"
    style="--_columns: 1fr 1.2fr; --_gap: var(--ui-space-7)"
    variant="outlined"
  >
    <div class="ui-layout-column ui-gap-large">
      <hgroup class="ui-hgroup">
        <p>The Bassbook Low-Down</p>
        <h1 class="ui-h3">Bass news worth reading, every other Thursday</h1>
        <p>
          New features, gear gossip and how other bassists rock Bassbook. Join
          12&nbsp;400 totally rad groovers.
        </p>
      </hgroup>
      <section aria-labelledby="newsletter-recent-heading">
        <h2 class="ui-overline" id="newsletter-recent-heading">
          Recent issues
        </h2>
        <List class="newsletter-issue" dense flush variant="transparent">
          <ListItem
            description="Sep 24, 2026, 6 min read"
            href="#newsletter-issue-48"
            label="#48 Rehearsing with fewer guitar solos"
          />
          <ListItem
            description="Sep 10, 2026, 8 min read"
            href="#newsletter-issue-47"
            label="#47 Inside my new pedalboard"
          />
        </List>
      </section>
    </div>
    <Form action="#" class="newsletter-form">
      <FieldGroup orientation="horizontal">
        <Field for="newsletter-email" label="Email">
          <input
            autocomplete="email"
            id="newsletter-email"
            name="email"
            placeholder="you@bassmail.example"
            required
            type="email"
          />
        </Field>
        <Button type="submit" variant="filled">Sign me up!</Button>
      </FieldGroup>
      <Fieldset>
        <FieldLegend>Topics</FieldLegend>
        <FieldDescription>Pick what you wanna hear about.</FieldDescription>
        <FieldGroup class="newsletter-topics">
          <Checkbox
            aria-describedby="newsletter-topic-news-text"
            defaultChecked
            name="newsletter-topics"
            value="news"
          >
            Bassbook news
            {#snippet endText()}
              <span id="newsletter-topic-news-text"
                >Shiny new features and fixes</span
              >
            {/snippet}
          </Checkbox>
          <Checkbox
            aria-describedby="newsletter-topic-gear-text"
            name="newsletter-topics"
            value="gear"
          >
            Gear Talk
            {#snippet endText()}
              <span id="newsletter-topic-gear-text"
                >Strings, amps and pedal hoarding</span
              >
            {/snippet}
          </Checkbox>
          <Checkbox
            aria-describedby="newsletter-topic-tips-text"
            defaultChecked
            name="newsletter-topics"
            value="tips"
          >
            Tabs &amp; tips
            {#snippet endText()}
              <span id="newsletter-topic-tips-text"
                >Grooves, slap tricks and drop D</span
              >
            {/snippet}
          </Checkbox>
          <Checkbox
            aria-describedby="newsletter-topic-diaries-text"
            name="newsletter-topics"
            value="diaries"
          >
            Member diaries
            {#snippet endText()}
              <span id="newsletter-topic-diaries-text"
                >Bassists just like you, venting</span
              >
            {/snippet}
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <Fieldset as="div" id="newsletter-frequency">
        <FieldLegend as="p">Frequency</FieldLegend>
        <ToggleGroup
          aria-labelledby="newsletter-frequency-legend"
          name="newsletter-frequency"
          size="small"
        >
          <ToggleButton defaultChecked value="biweekly"
            >Every other week</ToggleButton
          >
          <ToggleButton value="monthly">Monthly digest</ToggleButton>
        </ToggleGroup>
      </Fieldset>
      <p class="ui-caption">
        We'll only use your email for this newsletter, pinky promise.
        Unsubscribe with one click any time. Read our <a
          class="ui-link"
          href="#newsletter-privacy">privacy policy</a
        >.
      </p>
    </Form>
  </Card>
</div>

<style>
  :global {
    .newsletter {
      container-type: inline-size;

      .newsletter-card {
        padding: var(--ui-space-6);

        @container (inline-size >= 56rem) {
          padding: var(--ui-space-8);
        }
      }

      .newsletter-issue .ui-text p:first-child {
        font-weight: var(--ui-font-weight-medium);
      }

      .newsletter-form {
        align-content: start;
        gap: var(--ui-space-6);
      }

      .newsletter-topics {
        grid-template-columns: minmax(0, 1fr);

        @container (inline-size >= 40rem) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    }
  }
</style>
