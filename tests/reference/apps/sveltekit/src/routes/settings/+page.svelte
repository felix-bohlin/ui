<script lang="ts">
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
  } from "opui-css/svelte"
  import { verifyCode } from "reference-shared"

  let status = $state("")
  let code = $state("")
  let codeState: "idle" | "error" | "verified" = $state("idle")

  const save = (event: SubmitEvent) => {
    event.preventDefault()
    status = "Settings saved."
  }

  const verify = async (event: SubmitEvent) => {
    event.preventDefault()
    codeState = (await verifyCode(code)) ? "verified" : "error"
  }
</script>

<svelte:head>
  <title>Settings | Reference</title>
</svelte:head>

<div class="app-screen" data-screen="settings">
  <h1>Settings</h1>
  <Form aria-label="Settings" onsubmit={save}>
    <Fieldset>
      <FieldLegend>Account</FieldLegend>
      <FieldGroup>
        <TextField for="settings-display-name" label="Display name">
          <input id="settings-display-name" name="name" value="Sam Rivera" />
        </TextField>
        <TextField for="settings-email" label="Email">
          <input
            id="settings-email"
            name="email"
            required
            type="email"
            value="sam@example.com"
          />
        </TextField>
        <Select
          items={[
            { label: "Deutsch", value: "de" },
            { label: "English", value: "en" },
            { label: "Svenska", value: "sv" },
          ]}
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
        <Switch checked name="email-notifications">Email notifications</Switch>
        <Switch name="push-notifications">Push notifications</Switch>
      </FieldGroup>
    </Fieldset>
    <div id="settings-status" role="status">
      {#if status}
        <Callout severity="success">
          <CalloutIcon />
          <CalloutContent><p>{status}</p></CalloutContent>
        </Callout>
      {/if}
    </div>
    <FieldGroup>
      <Button type="submit" variant="filled">Save</Button>
    </FieldGroup>
  </Form>

  <section aria-labelledby="two-factor-title" class="app-screen">
    <h2 id="two-factor-title">Two-factor sign-in</h2>
    <Form aria-label="Two-factor sign-in" onsubmit={verify}>
      <OneTimeCode
        endText={codeState === "error"
          ? "That code didn't work. Try again."
          : undefined}
        for="settings-code"
        label="Code from your app"
      >
        <input
          aria-describedby={codeState === "error"
            ? "settings-code-end-text"
            : undefined}
          aria-invalid={codeState === "error" ? "true" : undefined}
          autocomplete="one-time-code"
          bind:value={code}
          id="settings-code"
          inputmode="numeric"
          maxlength="6"
          name="code"
          pattern="[0-9]{6}"
          required
        />
      </OneTimeCode>
      <div role="status">
        {#if codeState === "verified"}
          <Callout severity="success">
            <CalloutIcon />
            <CalloutContent><p>Two-factor sign-in is on.</p></CalloutContent>
          </Callout>
        {/if}
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
        variant="outlined">Delete account</Button
      >
    </div>
  </section>
</div>

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
      onclick={() =>
        (status = "Account deleted (not really, this is a test app).")}
      variant="filled">Delete</Button
    >
  </DialogFooter>
</Dialog>
