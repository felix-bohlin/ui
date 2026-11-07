<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Seat</FieldLegend>
      <FieldGroup name="radio-group-orientation" orientation="horizontal">
        <Radio checked value="window">Window</Radio>
        <Radio value="middle">Middle</Radio>
        <Radio value="aisle">Aisle</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
