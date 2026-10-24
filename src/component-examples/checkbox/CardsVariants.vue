<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Variants</FieldLegend>
      <FieldGroup name="checkbox-cards-variants" orientation="horizontal">
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
  </Form>
</template>
