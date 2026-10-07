<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Delivery</FieldLegend>
      <FieldGroup name="radio-spread">
        <Radio value="standard" checked spread>
          Standard
          <template #end-text>Arrives in 3 to 5 days.</template>
        </Radio>
        <Radio value="express" spread>
          Express
          <template #end-text>Arrives tomorrow.</template>
        </Radio>
        <Radio value="pickup" spread disabled>
          Pickup
          <template #end-text>Not available in your area.</template>
        </Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
