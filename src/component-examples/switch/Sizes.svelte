<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row">
  <Switch checked hideLabel name="switch-sizes" size="x-small">X-small</Switch>
  <Switch checked hideLabel name="switch-sizes" size="small">Small</Switch>
  <Switch checked hideLabel name="switch-sizes">Medium</Switch>
  <Switch checked hideLabel name="switch-sizes" size="large">Large</Switch>
</div>
<div class="example-row">
  <Switch checked name="switch-sizes" size="x-small">X-small</Switch>
  <Switch checked name="switch-sizes" size="small">Small</Switch>
  <Switch checked name="switch-sizes">Medium</Switch>
  <Switch checked name="switch-sizes" size="large">Large</Switch>
</div>
