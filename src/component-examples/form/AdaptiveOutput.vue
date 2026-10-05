<script setup lang="ts">
import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form as="div">
    <FieldSet as="div">
      <FieldLegend as="p">Delivery</FieldLegend>
      <FieldDescription>Rendered as div and p elements.</FieldDescription>
    </FieldSet>
  </Form>
</template>
