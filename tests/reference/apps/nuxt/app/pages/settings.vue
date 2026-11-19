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
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  OneTimeCode,
  Radio,
  Select,
  Switch,
  TextField,
} from "opui-css/vue"
import { verifyCode } from "reference-shared"

useHead({ title: "Settings" })

const languages = [
  { label: "English", value: "en" },
  { label: "Svenska", value: "sv" },
  { label: "Deutsch", value: "de" },
]

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
          <TextField label="Display name" name="name" value="Sam Rivera" />
          <TextField
            label="Email"
            name="email"
            required
            type="email"
            value="sam@example.com"
          />
          <Select
            :items="languages"
            label="Language"
            name="language"
            value="en"
          />
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
          v-model="code"
          :end-text="
            codeState === 'error'
              ? `That code didn't work. Try again.`
              : undefined
          "
          :error="codeState === 'error'"
          label="Code from your app"
          name="code"
          required
        />
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
