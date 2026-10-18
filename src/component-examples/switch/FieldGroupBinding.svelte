<script lang="ts">
  import {
    Button,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Switch,
  } from "opui-css/svelte"

  let notifications = $state(["email"])

  function reset() {
    notifications = ["email"]
  }
</script>

<FieldSet>
  <FieldLegend>Notifications</FieldLegend>
  <FieldGroup name="switch-binding">
    <Switch bind:group={notifications} value="email">Email</Switch>
    <Switch bind:group={notifications} value="push">Push</Switch>
    <Switch bind:group={notifications} value="sms">SMS</Switch>
  </FieldGroup>
</FieldSet>
<p class="switch-binding-text">
  Selected: {notifications.join(", ") || "none"}
</p>
<Button class="switch-binding-reset" onclick={reset}>Reset</Button>
