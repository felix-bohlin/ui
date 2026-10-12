<script setup lang="ts">
import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
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
      <Checkbox error>
        <CheckboxInput value="kibble" />
        <CheckboxLabel>Kibble</CheckboxLabel>
      </Checkbox>
      <Checkbox error>
        <CheckboxInput value="wet-food" />
        <CheckboxLabel>Wet food</CheckboxLabel>
      </Checkbox>
    </FieldGroup>
    <span class="ui-end-text">Your pet is hungry.</span>
  </FieldSet>
</template>
