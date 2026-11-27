<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Payment method</FieldLegend>
      <FieldGroup>
        <Radio checked name="radio-group" value="card">Card</Radio>
        <Radio name="radio-group" value="paypal">PayPal</Radio>
        <Radio name="radio-group" value="bank-transfer">Bank transfer</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
