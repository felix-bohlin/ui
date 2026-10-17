<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-spread" spread>
  Notifications
  {#snippet endText()}Receive alerts when someone mentions you.{/snippet}
</Switch>

<Switch name="switch-spread" spread required>
  Required
  {#snippet endText()}You must accept this to proceed.{/snippet}
</Switch>

<Switch name="switch-spread" spread disabled>
  Disabled
  {#snippet endText()}This switch is disabled.{/snippet}
</Switch>

<Switch name="switch-spread" spread error>
  Invalid Switch
  {#snippet endText()}There is an error with this switch.{/snippet}
</Switch>
