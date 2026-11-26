<script setup lang="ts">
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardContent,
  Checkbox,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
  Field,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Radio,
  SelectButton,
  StepButton,
} from "opui-css/vue"
</script>

<template>
  <div
    class="party-invitation ui-layout-container ui-layout-columns ui-gap-large"
    style="--_columns: 1fr 1fr; --_max-inline-size: 60rem"
  >
    <Card
      aria-labelledby="party-invitation-title"
      as="article"
      class="pi-invite"
      variant="outlined"
    >
      <div aria-hidden="true" class="pi-confetti"></div>
      <CardContent>
        <hgroup class="ui-hgroup">
          <p class="ui-overline">You're invited</p>
          <h1 class="pi-title" id="party-invitation-title">
            Adam turns 40 and still slaps
          </h1>
          <p>A night of karaoke, chili and one very loud birthday solo.</p>
        </hgroup>
        <DescriptionList
          class="pi-details ui-layout-grid"
          orientation="vertical"
          style="--_gap: var(--ui-space-4); --_min-inline-size: 11rem"
        >
          <DescriptionListItem>
            <DescriptionListTerm class="ui-overline">When</DescriptionListTerm>
            <DescriptionListDescription
              ><time datetime="2027-03-20T19:00"
                >Saturday 20 March, 19:00</time
              ></DescriptionListDescription
            >
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm class="ui-overline">Where</DescriptionListTerm>
            <DescriptionListDescription
              >The Rehearsal Basement, Fretgatan 4</DescriptionListDescription
            >
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm class="ui-overline"
              >Dress code</DescriptionListTerm
            >
            <DescriptionListDescription
              >Anything with a bass on it</DescriptionListDescription
            >
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm class="ui-overline"
              >Reply by</DescriptionListTerm
            >
            <DescriptionListDescription
              ><time datetime="2027-03-06"
                >Saturday 6 March</time
              ></DescriptionListDescription
            >
          </DescriptionListItem>
        </DescriptionList>
        <div class="ui-layout-row ui-gap-small">
          <AvatarGroup aria-label="Guests who are coming">
            <Avatar label="Kinga Headstock" src="/photos/kinga-headstock.png" />
            <Avatar aria-label="Ellen Nut" role="img">EN</Avatar>
          </AvatarGroup>
          <span>23 going, 4 maybe</span>
        </div>
      </CardContent>
    </Card>
    <Card
      aria-labelledby="party-invitation-rsvp-heading"
      as="section"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h4" id="party-invitation-rsvp-heading">RSVP</h2>
        <p>Adam is counting chairs. Please tell him soon.</p>
      </hgroup>
      <CardContent>
        <Form action="#" id="party-invitation-form">
          <FieldGroup>
            <Fieldset>
              <FieldLegend>Can you make it?</FieldLegend>
              <FieldGroup orientation="horizontal" role="radiogroup">
                <Radio
                  checked
                  label="Yes, I'm in"
                  name="party-invitation-attending"
                  value="yes"
                />
                <Radio
                  label="Maybe"
                  name="party-invitation-attending"
                  value="maybe"
                />
                <Radio
                  label="Can't make it"
                  name="party-invitation-attending"
                  value="no"
                />
              </FieldGroup>
            </Fieldset>
            <Field
              autoFit
              for="party-invitation-guests"
              label="Guests, you included"
            >
              <input
                id="party-invitation-guests"
                max="4"
                min="1"
                name="guests"
                type="number"
                :value.attr="'2'"
              />
              <template #start>
                <StepButton
                  command="--step-down"
                  for="party-invitation-guests"
                />
              </template>
              <template #end>
                <StepButton command="--step-up" for="party-invitation-guests" />
              </template>
            </Field>
            <Field for="party-invitation-food" label="Chili">
              <select id="party-invitation-food" name="food">
                <SelectButton />
                <option selected value="beef">Beef chili</option>
                <option value="bean">Three-bean chili</option>
                <option value="none">No chili, just cake</option>
              </select>
            </Field>
            <Field
              for="party-invitation-song"
              label="Karaoke song"
              startText="Adam vetoes anything without a bass line"
            >
              <input
                aria-describedby="party-invitation-song-start-text"
                id="party-invitation-song"
                name="song"
                placeholder="Under Pressure"
                type="text"
              />
            </Field>
            <Field for="party-invitation-message" label="Note for Adam">
              <textarea
                id="party-invitation-message"
                name="message"
                placeholder="Happy birthday, you groove legend"
                rows="3"
              ></textarea>
            </Field>
            <Checkbox checked name="reminder">
              Remind me the day before
            </Checkbox>
          </FieldGroup>
          <Button type="submit" variant="filled">Send RSVP</Button>
        </Form>
      </CardContent>
    </Card>
  </div>
</template>

<style>
.party-invitation {
  container-type: inline-size;

  .pi-invite {
    background-image: linear-gradient(
      160deg,
      oklch(from var(--ui-primary) l c h / 16%),
      transparent 70%
    );
    text-align: center;

    .ui-content {
      display: grid;
      gap: var(--ui-space-6);
      justify-items: center;
      padding-block-end: var(--ui-space-8);
    }
  }

  .pi-title {
    color: var(--ui-text-strong);
    font-size: var(--ui-font-size-900);
    letter-spacing: var(--ui-letter-spacing-display);
    line-height: var(--ui-line-height-tight);
    text-wrap: balance;
  }

  .pi-confetti {
    background-image:
      radial-gradient(
        circle,
        oklch(from var(--ui-warning) l c h / 80%) 0 0.3rem,
        transparent 0.34rem
      ),
      radial-gradient(
        circle,
        oklch(from var(--ui-primary) l c h / 70%) 0 0.24rem,
        transparent 0.28rem
      ),
      radial-gradient(
        circle,
        oklch(from var(--ui-success) l c h / 70%) 0 0.28rem,
        transparent 0.32rem
      ),
      radial-gradient(
        circle,
        oklch(from var(--ui-critical) l c h / 65%) 0 0.22rem,
        transparent 0.26rem
      );
    background-position:
      0.8rem 1.4rem,
      3.1rem 0.4rem,
      1.9rem 3.6rem,
      4.4rem 2.7rem;
    background-repeat: repeat;
    background-size:
      5.5rem 4.5rem,
      6.5rem 5rem,
      4.75rem 6rem,
      7rem 5.5rem;
    block-size: 5rem;
    mask-image: linear-gradient(black, transparent);
  }

  .pi-details {
    border-block: var(--ui-border-width) solid var(--ui-border-color);
    max-inline-size: 26rem;
    padding-block: var(--ui-space-5);
  }
}
</style>
