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
  <Fieldset>
    <FieldLegend>Delivery</FieldLegend>
    <FieldDescription>Where should we send your order?</FieldDescription>
    <FieldGroup>
      <TextField label="Recipient" name="recipient" />
      <Textarea label="Address" name="address" required />
    </FieldGroup>
  </Fieldset>
</template>
