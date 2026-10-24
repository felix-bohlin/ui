<script setup lang="ts">
import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Variants</FieldLegend>
      <FieldGroup name="radio-cards-variants" orientation="horizontal">
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
  </Form>
</template>
