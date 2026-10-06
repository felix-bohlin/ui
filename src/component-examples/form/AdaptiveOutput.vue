<script setup lang="ts">
import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form as="div">
    <FieldSet aria-labelledby="delivery-legend" as="div">
      <FieldLegend as="p" id="delivery-legend">Delivery</FieldLegend>
      <FieldDescription>Rendered as div and p elements.</FieldDescription>
    </FieldSet>
  </Form>
</template>
