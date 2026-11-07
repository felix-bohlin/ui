<script setup lang="ts">
import { FieldDescription, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form as="div">
    <Fieldset as="div">
      <FieldLegend as="p">Delivery</FieldLegend>
      <FieldDescription>Choose how your order gets to you.</FieldDescription>
    </Fieldset>
  </Form>
</template>
