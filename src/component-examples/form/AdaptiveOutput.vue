<script setup lang="ts">
import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form as="div">
    <FieldSet as="div">
      <FieldLegend as="p">Using as prop</FieldLegend>
      <FieldDescription> Renders as div and p elements. </FieldDescription>
    </FieldSet>
  </Form>
</template>
