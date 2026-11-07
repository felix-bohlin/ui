<script setup lang="ts">
import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Input at the end</FieldLegend>
      <FieldGroup name="radio-cards-end" orientation="horizontal">
        <Radio card checked spread value="outlined">
          Outlined
          <template #end-text>The default surface.</template>
        </Radio>
        <Radio card spread value="tonal" variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Radio>
        <Radio card spread value="elevated" variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Input at the start</FieldLegend>
      <FieldGroup name="radio-cards-start" orientation="horizontal">
        <Radio card checked value="outlined">
          Outlined
          <template #end-text>The default surface.</template>
        </Radio>
        <Radio card value="tonal" variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Radio>
        <Radio card value="elevated" variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
