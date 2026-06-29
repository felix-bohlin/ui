<script lang="ts">
  import { Switch } from "@opui/svelte"
</script>

<Switch spread>
  Notifications
  {#snippet endText()}
    Receive alerts when someone mentions you.
  {/snippet}
</Switch>

<Switch spread required>
  Required
  {#snippet endText()}
    You must accept this to proceed.
  {/snippet}
</Switch>

<Switch spread disabled>
  Disabled
  {#snippet endText()}
    This switch is disabled.
  {/snippet}
</Switch>

<Switch spread critical>
  Invalid Switch
  {#snippet endText()}
    There is an error with this switch.
  {/snippet}
</Switch>
