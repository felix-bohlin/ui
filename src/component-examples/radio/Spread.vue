<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Delivery</FieldLegend>
      <FieldGroup>
        <Radio checked name="radio-spread" spread value="standard">
          Standard
          <template #end-text>Arrives in 3 to 5 days.</template>
        </Radio>
        <Radio name="radio-spread" spread value="express">
          Express
          <template #end-text>Arrives tomorrow.</template>
        </Radio>
        <Radio disabled name="radio-spread" spread value="pickup">
          Pickup
          <template #end-text>Not available in your area.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
