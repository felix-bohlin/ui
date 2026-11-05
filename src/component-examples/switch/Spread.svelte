<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-spread" spread value="notifications">
  Notifications
  {#snippet endText()}Receive alerts when someone mentions you.{/snippet}
</Switch>

<Switch name="switch-spread" required spread value="two-step-login">
  Two-step login
  {#snippet endText()}Your organization requires it for admins.{/snippet}
</Switch>

<Switch disabled name="switch-spread" spread value="location">
  Location access
  {#snippet endText()}Turned off by your administrator.{/snippet}
</Switch>

<Switch error name="switch-spread" spread value="backup">
  Cloud backup
  {#snippet endText()}Sync needs cloud backup. Turn it on to continue.{/snippet}
</Switch>
