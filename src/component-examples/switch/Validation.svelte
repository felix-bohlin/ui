<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row ui-spacious">
  <Switch name="switch-validation" required>Default</Switch>
  <Switch name="switch-validation" required stack>Stack</Switch>
</div>

<div class="example-row ui-spacious">
  <Switch name="switch-validation" error>
    Default
    {#snippet endText()}Supporting text{/snippet}
  </Switch>
  <Switch name="switch-validation" error stack>
    Stack
    {#snippet endText()}Supporting text{/snippet}
  </Switch>
</div>
