<script lang="ts">
  import { Checkbox } from "opui-css/svelte"
</script>

<div class="example-row">
  <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="x-small"
    >X-small</Checkbox
  >
  <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="small"
    >Small</Checkbox
  >
  <Checkbox defaultChecked hideLabel name="checkbox-sizes">Medium</Checkbox>
  <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="large"
    >Large</Checkbox
  >
</div>
<div class="example-row">
  <Checkbox defaultChecked name="checkbox-sizes" size="x-small"
    >X-small</Checkbox
  >
  <Checkbox defaultChecked name="checkbox-sizes" size="small">Small</Checkbox>
  <Checkbox defaultChecked name="checkbox-sizes">Medium</Checkbox>
  <Checkbox defaultChecked name="checkbox-sizes" size="large">Large</Checkbox>
</div>
