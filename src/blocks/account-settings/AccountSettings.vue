<script setup lang="ts">
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  SelectButton,
  Switch,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  ToggleButton,
  ToggleGroup,
} from "opui-css/vue"
</script>

<template>
  <div
    class="account-settings ui-layout-container ui-layout-column ui-gap-large"
    style="--_max-inline-size: 48rem"
  >
    <hgroup class="ui-hgroup">
      <h1 class="ui-h3">Account settings</h1>
      <p>Tweak your profile, your password and how Bassbook looks for you.</p>
    </hgroup>
    <Tabs
      name="account-settings-tabs"
      style="--_panel-gap: var(--ui-space-5)"
      variant="line"
    >
      <TabsItem checked id="account-settings-tab-profile">
        <TabsLabel>Profile</TabsLabel>
        <TabsPanel>
          <Form action="#">
            <Fieldset>
              <FieldLegend>Photo</FieldLegend>
              <div class="ui-layout-row acct-photo">
                <Avatar aria-label="Adam Groove" role="img" shape="rounded"
                  >AG</Avatar
                >
                <div class="ui-layout-row ui-gap-small">
                  <Button size="small" type="button" variant="outlined"
                    >Upload new pic</Button
                  >
                  <Button size="small" type="button">Remove</Button>
                </div>
                <p class="ui-caption">
                  JPG or PNG, at least 256 × 256 px. Bass in frame encouraged!
                </p>
              </div>
            </Fieldset>
            <Fieldset>
              <FieldLegend>Personal details</FieldLegend>
              <FieldGroup>
                <div class="ui-layout-grid" style="--_min-inline-size: 18rem">
                  <Field for="account-settings-first-name" label="First name">
                    <input
                      autocomplete="given-name"
                      id="account-settings-first-name"
                      name="first-name"
                      required
                      type="text"
                      :value.attr="'Adam'"
                    />
                  </Field>
                  <Field for="account-settings-last-name" label="Last name">
                    <input
                      autocomplete="family-name"
                      id="account-settings-last-name"
                      name="last-name"
                      required
                      type="text"
                      :value.attr="'Groove'"
                    />
                  </Field>
                </div>
                <Field for="account-settings-email" label="Email">
                  <input
                    aria-describedby="account-settings-email-end-text"
                    autocomplete="email"
                    id="account-settings-email"
                    name="email"
                    required
                    type="email"
                    :value.attr="'adam@bassmail.example'"
                  />
                  <template #end-text>
                    <span class="ui-p ui-success">Verified</span>, used for
                    sign-in and wall scribble alerts</template
                  >
                </Field>
                <Field for="account-settings-username" label="Username">
                  <input
                    aria-describedby="account-settings-username-start"
                    autocomplete="username"
                    id="account-settings-username"
                    name="username"
                    type="text"
                    :value.attr="'percygroove'"
                  />
                  <template #start>bassbook.example/</template>
                </Field>
                <Field
                  for="account-settings-bio"
                  label="Bio"
                  startText="Shown on your profile for the whole world to admire"
                >
                  <textarea
                    aria-describedby="account-settings-bio-start-text account-settings-bio-bottom"
                    id="account-settings-bio"
                    name="bio"
                    rows="3"
                  >
Fretless bassist in a garage band. Into flatwounds, drop D and very long root notes.</textarea>
                  <template #bottom>84 / 160</template>
                </Field>
              </FieldGroup>
            </Fieldset>
            <FieldGroup class="acct-actions">
              <Button type="reset">Cancel</Button>
              <Button type="submit" variant="filled">Save my profile</Button>
            </FieldGroup>
          </Form>
        </TabsPanel>
      </TabsItem>
      <TabsItem id="account-settings-tab-password">
        <TabsLabel>Password</TabsLabel>
        <TabsPanel>
          <Form action="#">
            <Fieldset>
              <FieldLegend>Change password</FieldLegend>
              <FieldDescription
                >Last changed on 12 June 2026. Wow, so fresh!</FieldDescription
              >
              <FieldGroup>
                <Field
                  for="account-settings-current-password"
                  label="Current password"
                >
                  <input
                    autocomplete="current-password"
                    id="account-settings-current-password"
                    name="current-password"
                    required
                    type="password"
                  />
                </Field>
                <Field
                  endText='At least 12 characters. "slap-that-low-B" works great.'
                  for="account-settings-new-password"
                  label="New password"
                >
                  <input
                    aria-describedby="account-settings-new-password-end-text"
                    autocomplete="new-password"
                    id="account-settings-new-password"
                    minlength="12"
                    name="new-password"
                    required
                    type="password"
                  />
                </Field>
                <Field
                  for="account-settings-confirm-password"
                  label="Confirm new password"
                >
                  <input
                    autocomplete="new-password"
                    id="account-settings-confirm-password"
                    name="confirm-password"
                    required
                    type="password"
                  />
                </Field>
              </FieldGroup>
            </Fieldset>
            <Fieldset>
              <FieldLegend>Sign-in security</FieldLegend>
              <FieldGroup>
                <Switch
                  checked
                  endText="Ask for a code so nobody sneaks onto your wall."
                  label="Two-factor authentication"
                  name="two-factor"
                  spread
                />
                <Switch
                  checked
                  endText="Email me when a new computer signs in."
                  label="Sign-in alerts"
                  name="sign-in-alerts"
                  spread
                />
              </FieldGroup>
            </Fieldset>
            <FieldGroup class="acct-actions">
              <Button type="submit" variant="filled">Update password</Button>
            </FieldGroup>
          </Form>
        </TabsPanel>
      </TabsItem>
      <TabsItem id="account-settings-tab-preferences">
        <TabsLabel>Preferences</TabsLabel>
        <TabsPanel>
          <Form action="#">
            <Fieldset>
              <FieldLegend>Theme</FieldLegend>
              <ToggleGroup aria-label="Theme" name="account-settings-theme">
                <ToggleButton label="Light" value="light" />
                <ToggleButton label="Dark" value="dark" />
                <ToggleButton checked label="System" value="system" />
              </ToggleGroup>
            </Fieldset>
            <Fieldset>
              <FieldLegend>Region</FieldLegend>
              <div class="ui-layout-grid" style="--_min-inline-size: 18rem">
                <Field for="account-settings-language" label="Language">
                  <select id="account-settings-language" name="language">
                    <SelectButton />
                    <option value="da">Dansk</option>
                    <option value="de">Deutsch</option>
                    <option selected value="en">English</option>
                    <option value="nb">Norsk</option>
                    <option value="sv">Svenska</option>
                  </select>
                </Field>
                <Field for="account-settings-timezone" label="Time zone">
                  <select id="account-settings-timezone" name="timezone">
                    <SelectButton />
                    <option value="london">London (GMT+1)</option>
                    <option selected value="stockholm">
                      Stockholm (GMT+2)
                    </option>
                    <option value="helsinki">Helsinki (GMT+3)</option>
                  </select>
                </Field>
              </div>
            </Fieldset>
            <Fieldset>
              <FieldLegend>Accessibility</FieldLegend>
              <FieldGroup>
                <Switch label="Reduce motion" name="reduce-motion" spread />
                <Switch
                  checked
                  label="Always underline links"
                  name="underline-links"
                  spread
                />
              </FieldGroup>
            </Fieldset>
            <FieldGroup class="acct-actions">
              <Button type="submit" variant="filled">Save my prefs</Button>
            </FieldGroup>
          </Form>
        </TabsPanel>
      </TabsItem>
    </Tabs>
    <Card
      aria-labelledby="account-settings-danger-heading"
      as="section"
      class="acct-danger"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="account-settings-danger-heading">Danger zone</h2>
      </hgroup>
      <CardContent class="ui-layout-row ui-spread">
        <p>
          Deleting your account removes your profile, wall and bass photos for
          good. Save your favourite pics first! We'll miss you :(
        </p>
        <Button
          color="critical"
          command="show-modal"
          commandfor="account-settings-delete-dialog"
          type="button"
          variant="outlined"
          >Delete account</Button
        >
      </CardContent>
    </Card>
    <Dialog
      aria-describedby="account-settings-delete-description"
      id="account-settings-delete-dialog"
      role="alertdialog"
    >
      <DialogHeader>
        <DialogTitle>Delete your account?</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <p id="account-settings-delete-description">
          This deletes adam@bassmail.example, your wall and every photo of your
          gear. You can't undo this.
        </p>
      </DialogContent>
      <DialogFooter>
        <Button
          command="close"
          commandfor="account-settings-delete-dialog"
          type="button"
          >Cancel</Button
        >
        <Button
          color="critical"
          command="close"
          commandfor="account-settings-delete-dialog"
          type="button"
          variant="filled"
          >Delete account</Button
        >
      </DialogFooter>
    </Dialog>
  </div>
</template>

<style>
.account-settings {
  container-type: inline-size;

  .acct-photo {
    .ui-avatar {
      font-size: var(--ui-font-size-600);
      inline-size: 5rem;
    }

    p {
      flex-basis: 100%;

      @container (inline-size >= 40rem) {
        flex-basis: auto;
      }
    }
  }

  .acct-actions {
    justify-content: end;
  }

  .acct-danger {
    --_outlined-border-color: var(--ui-critical-text);

    p {
      flex: 1 1 18rem;
    }
  }
}
</style>
