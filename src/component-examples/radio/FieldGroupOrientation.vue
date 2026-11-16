<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Spot on stage</FieldLegend>
      <FieldGroup name="radio-group-orientation" orientation="horizontal">
        <Radio checked value="front">Front</Radio>
        <Radio value="middle">Middle</Radio>
        <Radio value="amp">Behind the amp</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
