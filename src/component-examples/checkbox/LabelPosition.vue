<script setup lang="ts">
import { Checkbox, CheckboxInput, CheckboxLabel } from "opui-css/vue"
</script>

<template>
  <Checkbox>
    <CheckboxInput name="checkbox-label-position" />
    <CheckboxLabel>Default</CheckboxLabel>
  </Checkbox>
  <Checkbox stack>
    <CheckboxInput name="checkbox-label-position" />
    <CheckboxLabel>Stack</CheckboxLabel>
  </Checkbox>
</template>
