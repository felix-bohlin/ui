<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row">
  <Switch name="switch-sizes" size="x-small" checked hideLabel>X-small</Switch>
  <Switch name="switch-sizes" size="small" checked hideLabel>Small</Switch>
  <Switch name="switch-sizes" checked hideLabel>Default</Switch>
  <Switch name="switch-sizes" size="large" checked hideLabel>Large</Switch>
</div>
<div class="example-row">
  <Switch name="switch-sizes" size="x-small" checked>X-small</Switch>
  <Switch name="switch-sizes" size="small" checked>Small</Switch>
  <Switch name="switch-sizes" checked>Default</Switch>
  <Switch name="switch-sizes" size="large" checked>Large</Switch>
</div>
