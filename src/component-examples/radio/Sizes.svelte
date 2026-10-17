<script lang="ts">
  import { Radio } from "opui-css/svelte"
</script>

<div class="example-row">
  <Radio
    name="radio-sizes-x-small"
    size="x-small"
    value="selected"
    checked
    hideLabel>Selected</Radio
  >
  <Radio
    name="radio-sizes-small"
    size="small"
    value="selected"
    checked
    hideLabel>Selected</Radio
  >
  <Radio name="radio-sizes-default" value="selected" checked hideLabel
    >Selected</Radio
  >
  <Radio
    name="radio-sizes-large"
    size="large"
    value="selected"
    checked
    hideLabel>Selected</Radio
  >
</div>
<div class="example-row">
  <Radio name="radio-sizes-x-small" size="x-small" value="other">x-small</Radio>
  <Radio name="radio-sizes-small" size="small" value="other">Small</Radio>
  <Radio name="radio-sizes-default" value="other">Default</Radio>
  <Radio name="radio-sizes-large" size="large" value="other">Large</Radio>
</div>
