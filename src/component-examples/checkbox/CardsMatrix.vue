<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Input at the end</FieldLegend>
      <FieldGroup name="checkbox-cards-end" orientation="horizontal">
        <Checkbox card checked spread value="outlined">
          Outlined
          <template #end-text>The default surface.</template>
        </Checkbox>
        <Checkbox card spread value="tonal" variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Checkbox>
        <Checkbox card spread value="elevated" variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Input at the start</FieldLegend>
      <FieldGroup name="checkbox-cards-start" orientation="horizontal">
        <Checkbox card checked value="outlined">
          Outlined
          <template #end-text>The default surface.</template>
        </Checkbox>
        <Checkbox card value="tonal" variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Checkbox>
        <Checkbox card value="elevated" variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
