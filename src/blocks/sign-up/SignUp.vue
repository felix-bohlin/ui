<script setup lang="ts">
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  List,
  ListItem,
  PasswordToggle,
  Progress,
  RadioInput,
} from "opui-css/vue"
</script>

<template>
  <div class="sign-up ui-layout-container" style="--_max-inline-size: 66rem">
    <div
      class="ui-layout-columns sign-up-layout"
      style="--_columns: 7fr 5fr; --_gap: var(--ui-space-7)"
    >
      <Card density="spacious" variant="outlined">
        <hgroup>
          <h1 class="ui-h4">Join Bassbook!</h1>
          <p>Finally, a place where people actually listen to the bassist.</p>
        </hgroup>
        <CardContent>
          <Form action="#">
            <FieldGroup>
              <FieldGroup orientation="horizontal">
                <Field for="sign-up-first-name" label="First name">
                  <input
                    autocomplete="given-name"
                    id="sign-up-first-name"
                    name="first-name"
                    placeholder="Josh"
                    required
                    type="text"
                  />
                </Field>
                <Field for="sign-up-last-name" label="Last name">
                  <input
                    autocomplete="family-name"
                    id="sign-up-last-name"
                    name="last-name"
                    placeholder="Rootnote"
                    required
                    type="text"
                  />
                </Field>
              </FieldGroup>
              <Field for="sign-up-email" label="Email">
                <input
                  autocomplete="email"
                  id="sign-up-email"
                  name="email"
                  placeholder="josh@bassmail.example"
                  required
                  type="email"
                />
              </Field>
              <Field
                endText="At least 12 characters, with a number or a symbol. Go wild!"
                for="sign-up-password"
                label="Password"
              >
                <input
                  aria-describedby="sign-up-password-end-text"
                  autocomplete="new-password"
                  id="sign-up-password"
                  minlength="12"
                  name="password"
                  required
                  type="password"
                  :value.attr="'four-strings-4ever'"
                />
                <template #end>
                  <PasswordToggle for="sign-up-password" />
                </template>
              </Field>
              <div class="ui-layout-column ui-gap-x-small">
                <span
                  class="ui-layout-row ui-spread sign-up-strength-label"
                  id="sign-up-strength"
                  ><span>Password strength</span
                  ><span class="ui-p ui-success sign-up-strong"
                    >Strong</span
                  ></span
                >
                <Progress
                  aria-labelledby="sign-up-strength"
                  max="4"
                  value="3"
                />
              </div>
            </FieldGroup>
            <Fieldset>
              <FieldLegend>Membership</FieldLegend>
              <FieldDescription>
                Switch whenever you like, no hard feelings!
              </FieldDescription>
              <List bordered class="sign-up-plans" variant="transparent">
                <ListItem
                  choice="radio"
                  description="A profile, a wall and all the sympathy you need."
                  for="sign-up-plan-basic"
                  label="Basic"
                >
                  <template #end>
                    <span class="ui-tabular-nums sign-up-price">€0</span>
                    <RadioInput
                      id="sign-up-plan-basic"
                      name="sign-up-plan"
                      value="basic"
                    />
                  </template>
                </ListItem>
                <ListItem
                  choice="radio"
                  description="A shiny gold name and unlimited photos of your gear."
                  for="sign-up-plan-gold"
                  label="Gold"
                >
                  <template #end>
                    <span class="ui-tabular-nums sign-up-price"
                      >€3 / month</span
                    >
                    <RadioInput
                      checked
                      id="sign-up-plan-gold"
                      name="sign-up-plan"
                      value="gold"
                    />
                  </template>
                </ListItem>
                <ListItem
                  choice="radio"
                  description="Everything in Gold, and your posts are always 10% louder."
                  for="sign-up-plan-platinum"
                  label="Platinum"
                >
                  <template #end>
                    <span class="ui-tabular-nums sign-up-price"
                      >€5 / month</span
                    >
                    <RadioInput
                      id="sign-up-plan-platinum"
                      name="sign-up-plan"
                      value="platinum"
                    />
                  </template>
                </ListItem>
              </List>
            </Fieldset>
            <FieldGroup>
              <Checkbox name="terms" required>
                I agree to the
                <a class="ui-link" href="#sign-up-terms">Terms of Service</a>
                and the
                <a class="ui-link" href="#sign-up-privacy">Privacy Policy</a>.
              </Checkbox>
              <Checkbox name="updates">
                Send me the Bassbook newsletter, about once a month. It has
                tabs!
              </Checkbox>
              <Button class="sign-up-submit" type="submit" variant="filled">
                Sign me up!
              </Button>
            </FieldGroup>
          </Form>
          <p class="sign-up-footer">
            Already a member?
            <a class="ui-link" href="#sign-up-sign-in">Log in</a>
          </p>
        </CardContent>
      </Card>
      <aside
        aria-label="Why Bassbook"
        class="ui-layout-column ui-gap-large sign-up-aside"
      >
        <hgroup class="ui-hgroup">
          <p class="ui-overline">Why bassists join</p>
          <h2 class="ui-h3">The only crowd that watches your fingers</h2>
        </hgroup>
        <List flush variant="transparent">
          <ListItem
            description="Bring your gear list, your tabs and your grudges."
            label="Set up in minutes"
          >
            <template #start>
              <svg
                data-icon="check-circle"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                ></path>
              </svg>
            </template>
          </ListItem>
          <ListItem
            description="Every post gets read, even the ones about tone."
            label="People actually listen"
          >
            <template #start>
              <svg
                data-icon="check-circle"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                ></path>
              </svg>
            </template>
          </ListItem>
          <ListItem
            description="Take all your stuff with you in one click."
            label="Cancel any time"
          >
            <template #start>
              <svg
                data-icon="check-circle"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                ></path>
              </svg>
            </template>
          </ListItem>
        </List>
        <blockquote class="ui-blockquote">
          “My band still won't let me pick the songs, but here 300 people liked
          my pedalboard!”
          <footer>
            Adam Groove, <cite>bassist in Brad and the Brads</cite>
          </footer>
        </blockquote>
      </aside>
    </div>
  </div>
</template>

<style>
.sign-up {
  .sign-up-layout {
    align-items: center;
  }

  .sign-up-strength-label {
    font-size: var(--ui-font-size-caption);
  }

  .sign-up-strong {
    font-weight: var(--ui-font-weight-semibold);
  }

  .sign-up-plans .ui-end {
    gap: var(--ui-space-4);
  }

  .sign-up-price {
    white-space: nowrap;
  }

  .sign-up-submit {
    inline-size: 100%;
  }

  .sign-up-footer {
    text-align: center;
  }

  .sign-up-aside {
    padding-inline: var(--ui-space-2);
  }
}
</style>
