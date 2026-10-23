<script setup lang="ts">
import { FieldDescription, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form as="div">
    <Fieldset aria-labelledby="form-adaptive-output-1-legend" as="div">
      <FieldLegend as="p" id="form-adaptive-output-1-legend"
        >Delivery</FieldLegend
      >
      <FieldDescription>Rendered as div and p elements.</FieldDescription>
    </Fieldset>
  </Form>
</template>
