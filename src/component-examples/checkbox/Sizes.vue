<script setup lang="ts">
import { Checkbox, CheckboxInput, CheckboxLabel } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Checkbox size="x-small">
      <CheckboxInput checked name="checkbox-sizes" />
      <CheckboxLabel visuallyHidden>Label</CheckboxLabel>
    </Checkbox>
    <Checkbox size="small">
      <CheckboxInput checked name="checkbox-sizes" />
      <CheckboxLabel visuallyHidden>Label</CheckboxLabel>
    </Checkbox>
    <Checkbox>
      <CheckboxInput checked name="checkbox-sizes" />
      <CheckboxLabel visuallyHidden>Label</CheckboxLabel>
    </Checkbox>
    <Checkbox size="large">
      <CheckboxInput checked name="checkbox-sizes" />
      <CheckboxLabel visuallyHidden>Label</CheckboxLabel>
    </Checkbox>
  </div>
  <div class="example-row">
    <Checkbox size="x-small">
      <CheckboxInput checked name="checkbox-sizes" />
      <CheckboxLabel>x-small</CheckboxLabel>
    </Checkbox>
    <Checkbox size="small">
      <CheckboxInput checked name="checkbox-sizes" />
      <CheckboxLabel>Small</CheckboxLabel>
    </Checkbox>
    <Checkbox>
      <CheckboxInput checked name="checkbox-sizes" />
      <CheckboxLabel>Default</CheckboxLabel>
    </Checkbox>
    <Checkbox size="large">
      <CheckboxInput checked name="checkbox-sizes" />
      <CheckboxLabel>Large</CheckboxLabel>
    </Checkbox>
  </div>
</template>
