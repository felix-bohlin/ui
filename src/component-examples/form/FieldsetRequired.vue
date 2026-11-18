<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Textarea,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <Fieldset aria-describedby="form-fieldset-required-1-description">
    <FieldLegend>Delivery</FieldLegend>
    <FieldDescription id="form-fieldset-required-1-description"
      >Where should we send your order?</FieldDescription
    >
    <FieldGroup>
      <TextField label="Recipient" name="recipient" />
      <Textarea label="Address" name="address" required />
    </FieldGroup>
  </Fieldset>
</template>
