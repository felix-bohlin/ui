<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Spot on stage</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Radio checked name="radio-group-orientation" value="front"
          >Front</Radio
        >
        <Radio name="radio-group-orientation" value="middle">Middle</Radio>
        <Radio name="radio-group-orientation" value="amp">Behind the amp</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
