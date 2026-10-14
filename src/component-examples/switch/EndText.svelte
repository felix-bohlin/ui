<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-supporting-text">
  Default
  {#snippet endText()}Supporting text{/snippet}
</Switch>
<Switch name="switch-supporting-text" stack>
  Stack
  {#snippet endText()}Supporting text{/snippet}
</Switch>
