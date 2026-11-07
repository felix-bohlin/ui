<script setup lang="ts">
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  SelectAll,
} from "opui-css/vue"
</script>

<template>
  <SelectAll>
    <Fieldset>
      <FieldLegend>
        <Checkbox data-select-all="">Select all</Checkbox>
      </FieldLegend>
      <FieldGroup name="indeterminate-children">
        <Checkbox checked>Apples</Checkbox>
        <Checkbox>Bananas</Checkbox>
        <Checkbox>Cherries</Checkbox>
      </FieldGroup>
    </Fieldset>
  </SelectAll>
</template>
