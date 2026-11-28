<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset disabled>
      <FieldLegend>Band practice</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Radio checked name="radio-group-disabled" value="weekly">Weekly</Radio>
        <Radio name="radio-group-disabled" value="monthly">Monthly</Radio>
        <Radio name="radio-group-disabled" value="drummer"
          >When the drummer shows up</Radio
        >
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Delivery</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Radio checked name="radio-group-disabled-single" value="standard"
          >Standard</Radio
        >
        <Radio disabled name="radio-group-disabled-single" value="same-day"
          >Same day</Radio
        >
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
