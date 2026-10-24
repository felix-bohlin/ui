<script setup lang="ts">
import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Input at the end</FieldLegend>
      <FieldGroup name="radio-cards-end" orientation="horizontal">
        <Radio value="outlined" checked card spread>
          Outlined
          <template #end-text>The default surface.</template>
        </Radio>
        <Radio value="tonal" card variant="tonal" spread>
          Tonal
          <template #end-text>A tinted surface.</template>
        </Radio>
        <Radio value="elevated" card variant="elevated" spread>
          Elevated
          <template #end-text>A raised surface.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Input at the start</FieldLegend>
      <FieldGroup name="radio-cards-start" orientation="horizontal">
        <Radio value="outlined" checked card>
          Outlined
          <template #end-text>The default surface.</template>
        </Radio>
        <Radio value="tonal" card variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Radio>
        <Radio value="elevated" card variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
