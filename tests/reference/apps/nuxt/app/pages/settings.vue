<script setup lang="ts">
import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  OneTimeCode,
  Radio,
  SelectButton,
  Switch,
} from "opui-css/vue"
import { verifyCode } from "reference-shared"

useHead({ title: "Settings" })

const status = ref("")
const code = ref("")
const codeState = ref<"idle" | "error" | "verified">("idle")

const save = () => {
  status.value = "Settings saved."
}

const verify = async () => {
  codeState.value = (await verifyCode(code.value)) ? "verified" : "error"
}

const deleteAccount = () => {
  status.value = "Account deleted (not really, this is a test app)."
}
</script>

<template>
  <div class="app-screen" data-screen="settings">
    <h1>Settings</h1>
    <Form aria-label="Settings" @submit.prevent="save">
      <Fieldset>
        <FieldLegend>Account</FieldLegend>
        <FieldGroup>
          <Field for="settings-display-name" label="Display name">
            <input id="settings-display-name" name="name" value="Sam Rivera" />
          </Field>
          <Field for="settings-email" label="Email">
            <input
              id="settings-email"
              name="email"
              required
              type="email"
              value="sam@example.com"
            />
          </Field>
          <Field for="settings-language" label="Language">
            <select id="settings-language" name="language">
              <SelectButton />
              <option value="de">Deutsch</option>
              <option selected value="en">English</option>
              <option value="sv">Svenska</option>
            </select>
          </Field>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Who can see your posts</FieldLegend>
        <FieldGroup name="visibility">
          <Radio value="everyone">Everyone</Radio>
          <Radio checked value="friends">Friends</Radio>
          <Radio value="only-me">Only me</Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup>
          <Switch checked name="email-notifications"
            >Email notifications</Switch
          >
          <Switch name="push-notifications">Push notifications</Switch>
        </FieldGroup>
      </Fieldset>
      <div id="settings-status" role="status">
        <Callout v-if="status" severity="success">
          <CalloutIcon />
          <CalloutContent>
            <p>{{ status }}</p>
          </CalloutContent>
        </Callout>
      </div>
      <FieldGroup>
        <Button type="submit" variant="filled">Save</Button>
      </FieldGroup>
    </Form>

    <section aria-labelledby="two-factor-title" class="app-screen">
      <h2 id="two-factor-title">Two-factor sign-in</h2>
      <Form aria-label="Two-factor sign-in" @submit.prevent="verify">
        <OneTimeCode
          :end-text="
            codeState === 'error'
              ? `That code didn't work. Try again.`
              : undefined
          "
          for="settings-code"
          label="Code from your app"
        >
          <input
            :aria-describedby="
              codeState === 'error' ? 'settings-code-end-text' : undefined
            "
            :aria-invalid="codeState === 'error' ? 'true' : undefined"
            autocomplete="one-time-code"
            id="settings-code"
            inputmode="numeric"
            maxlength="6"
            name="code"
            pattern="[0-9]{6}"
            required
            v-model="code"
          />
        </OneTimeCode>
        <div role="status">
          <Callout v-if="codeState === 'verified'" severity="success">
            <CalloutIcon />
            <CalloutContent>
              <p>Two-factor sign-in is on.</p>
            </CalloutContent>
          </Callout>
        </div>
        <FieldGroup>
          <Button type="submit" variant="outlined">Verify</Button>
        </FieldGroup>
      </Form>
    </section>

    <section aria-labelledby="danger-title" class="app-screen">
      <h2 id="danger-title">Danger zone</h2>
      <div>
        <Button
          color="critical"
          command="show-modal"
          commandfor="delete-account"
          variant="outlined"
          >Delete account</Button
        >
      </div>
    </section>

    <Dialog id="delete-account">
      <DialogHeader>
        <DialogTitle>Delete your account?</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <p>This removes your posts and photos.</p>
      </DialogContent>
      <DialogFooter>
        <Button command="close" commandfor="delete-account">Cancel</Button>
        <Button
          color="critical"
          command="close"
          commandfor="delete-account"
          variant="filled"
          @click="deleteAccount"
          >Delete</Button
        >
      </DialogFooter>
    </Dialog>
  </div>
</template>
