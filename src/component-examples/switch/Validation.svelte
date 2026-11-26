<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row">
  <Switch name="switch-validation" required>Default</Switch>
  <Switch name="switch-validation" orientation="vertical" required>Stack</Switch
  >
</div>

<div class="example-row">
  <Switch defaultChecked error name="switch-validation">
    Default
    {#snippet endText()}Supporting text{/snippet}
  </Switch>
  <Switch error name="switch-validation" orientation="vertical">
    Stack
    {#snippet endText()}Supporting text{/snippet}
  </Switch>
</div>
