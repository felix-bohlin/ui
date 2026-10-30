<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-spread" spread>
  Notifications
  {#snippet endText()}Receive alerts when someone mentions you.{/snippet}
</Switch>

<Switch name="switch-spread" required spread>
  Required
  {#snippet endText()}You must accept this to proceed.{/snippet}
</Switch>

<Switch disabled name="switch-spread" spread>
  Disabled
  {#snippet endText()}This switch is disabled.{/snippet}
</Switch>

<Switch error name="switch-spread" spread>
  Invalid Switch
  {#snippet endText()}Turn this on to continue.{/snippet}
</Switch>
