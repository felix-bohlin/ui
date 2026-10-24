<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Input at the end</FieldLegend>
      <FieldGroup name="checkbox-cards-end" orientation="horizontal">
        <Checkbox value="outlined" checked card spread>
          Outlined
          <template #end-text>The default surface.</template>
        </Checkbox>
        <Checkbox value="tonal" card variant="tonal" spread>
          Tonal
          <template #end-text>A tinted surface.</template>
        </Checkbox>
        <Checkbox value="elevated" card variant="elevated" spread>
          Elevated
          <template #end-text>A raised surface.</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Input at the start</FieldLegend>
      <FieldGroup name="checkbox-cards-start" orientation="horizontal">
        <Checkbox value="outlined" checked card>
          Outlined
          <template #end-text>The default surface.</template>
        </Checkbox>
        <Checkbox value="tonal" card variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Checkbox>
        <Checkbox value="elevated" card variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
