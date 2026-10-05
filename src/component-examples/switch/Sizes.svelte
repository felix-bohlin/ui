<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row">
  <Switch name="switch-sizes" size="small" checked hideLabel>Small</Switch>
  <Switch name="switch-sizes" checked hideLabel>Default</Switch>
</div>
<div class="example-row">
  <Switch name="switch-sizes" size="small" checked>Small</Switch>
  <Switch name="switch-sizes" checked>Default</Switch>
</div>
