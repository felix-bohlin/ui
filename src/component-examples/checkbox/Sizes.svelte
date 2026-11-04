<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<div class="example-row">
  <Checkbox checked hideLabel name="checkbox-sizes" size="x-small"
    >Label</Checkbox
  >
  <Checkbox checked hideLabel name="checkbox-sizes" size="small">Label</Checkbox
  >
  <Checkbox checked hideLabel name="checkbox-sizes">Label</Checkbox>
  <Checkbox checked hideLabel name="checkbox-sizes" size="large">Label</Checkbox
  >
</div>
<div class="example-row">
  <Checkbox checked name="checkbox-sizes" size="x-small">x-small</Checkbox>
  <Checkbox checked name="checkbox-sizes" size="small">Small</Checkbox>
  <Checkbox checked name="checkbox-sizes">Medium</Checkbox>
  <Checkbox checked name="checkbox-sizes" size="large">Large</Checkbox>
</div>
