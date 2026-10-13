<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<div class="example-row">
  <Checkbox hideLabel size="x-small" checked name="checkbox-sizes"
    >Label</Checkbox
  >
  <Checkbox hideLabel size="small" checked name="checkbox-sizes">Label</Checkbox
  >
  <Checkbox hideLabel checked name="checkbox-sizes">Label</Checkbox>
  <Checkbox hideLabel size="large" checked name="checkbox-sizes">Label</Checkbox
  >
</div>
<div class="example-row">
  <Checkbox size="x-small" checked name="checkbox-sizes">x-small</Checkbox>
  <Checkbox size="small" checked name="checkbox-sizes">Small</Checkbox>
  <Checkbox checked name="checkbox-sizes">Default</Checkbox>
  <Checkbox size="large" checked name="checkbox-sizes">Large</Checkbox>
</div>
