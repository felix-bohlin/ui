<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/vue"
</script>

<template>
  <Fieldset aria-describedby="form-fieldset-disabled-1-description" disabled>
    <FieldLegend>Security alerts</FieldLegend>
    <FieldDescription id="form-fieldset-disabled-1-description"
      >Your administrator manages these settings.</FieldDescription
    >
    <FieldGroup name="alerts">
      <Checkbox checked value="email">Email</Checkbox>
      <Checkbox checked value="sms">SMS</Checkbox>
    </FieldGroup>
  </Fieldset>
</template>
