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
  <FieldSet data-invalid>
    <FieldLegend>Pet food</FieldLegend>
    <FieldDescription>Pick at least one.</FieldDescription>
    <FieldGroup name="food">
      <Checkbox value="kibble">Kibble</Checkbox>
      <Checkbox value="wet-food">Wet food</Checkbox>
    </FieldGroup>
    <span class="ui-end-text">Your pet is hungry.</span>
  </FieldSet>
</template>
