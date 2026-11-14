<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset disabled>
      <FieldLegend>Band practice</FieldLegend>
      <FieldGroup name="radio-group-disabled" orientation="horizontal">
        <Radio checked value="weekly">Weekly</Radio>
        <Radio value="monthly">Monthly</Radio>
        <Radio value="drummer">When the drummer shows up</Radio>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Delivery</FieldLegend>
      <FieldGroup name="radio-group-disabled-single" orientation="horizontal">
        <Radio checked value="standard">Standard</Radio>
        <Radio disabled value="same-day">Same day</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
