<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Payment method</FieldLegend>
      <FieldGroup name="radio-group">
        <Radio checked value="card">Card</Radio>
        <Radio value="paypal">PayPal</Radio>
        <Radio value="bank-transfer">Bank transfer</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
