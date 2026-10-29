<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
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
    </Fieldset>
  </Form>
</template>
