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
  <FieldSet disabled>
    <FieldLegend>Pet dating</FieldLegend>
    <FieldDescription>You can't change these settings</FieldDescription>
    <FieldGroup name="notifications">
      <Checkbox>
        <CheckboxInput value="horse-tinder" checked />
        <CheckboxLabel>Horse Tinder</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput value="onlyhorsefans" checked />
        <CheckboxLabel>OnlyHorseFans</CheckboxLabel>
      </Checkbox>
    </FieldGroup>
  </FieldSet>
</template>
