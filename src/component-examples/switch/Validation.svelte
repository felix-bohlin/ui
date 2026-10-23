<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row ui-spacious">
  <Switch name="switch-validation" required>Default</Switch>
  <Switch name="switch-validation" required orientation="vertical">Stack</Switch
  >
</div>

<div class="example-row ui-spacious">
  <Switch name="switch-validation" error checked>
    Default
    {#snippet endText()}Supporting text{/snippet}
  </Switch>
  <Switch name="switch-validation" error orientation="vertical">
    Stack
    {#snippet endText()}Supporting text{/snippet}
  </Switch>
</div>
