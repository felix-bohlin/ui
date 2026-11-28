<script lang="ts">
  import {
    Button,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Switch,
  } from "opui-css/svelte"

  const channels = ["email", "push", "sms"]

  let notifications = $state(["email"])
  const summary = $derived(
    channels.filter((channel) => notifications.includes(channel)).join(", ") ||
      "none",
  )

  function reset() {
    notifications = ["email"]
  }
</script>

<Fieldset>
  <FieldLegend>Notifications</FieldLegend>
  <FieldGroup>
    <Switch bind:group={notifications} name="switch-binding" value="email"
      >Email</Switch
    >
    <Switch bind:group={notifications} name="switch-binding" value="push"
      >Push</Switch
    >
    <Switch bind:group={notifications} name="switch-binding" value="sms"
      >SMS</Switch
    >
  </FieldGroup>
</Fieldset>
<p class="switch-binding-text">Selected: {summary}</p>
<Button class="switch-binding-reset" onclick={reset}>Reset</Button>
