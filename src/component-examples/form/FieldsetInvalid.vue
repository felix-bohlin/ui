<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/vue"
</script>

<template>
  <FieldSet>
    <FieldLegend>Pet food</FieldLegend>
    <FieldDescription>Pick at least one.</FieldDescription>
    <FieldGroup name="food">
      <Checkbox error value="kibble">Kibble</Checkbox>
      <Checkbox error value="wet-food">Wet food</Checkbox>
    </FieldGroup>
    <span class="ui-end-text">Your pet is hungry.</span>
  </FieldSet>
</template>
