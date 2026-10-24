<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Add-ons</FieldLegend>
      <FieldGroup name="checkbox-cards-start">
        <Checkbox value="support" checked card>
          Priority support
          <template #end-text>Answers within a day.</template>
        </Checkbox>
        <Checkbox value="storage" card>
          Extra storage
          <template #end-text>Another 100 GB.</template>
        </Checkbox>
        <Checkbox value="domain" disabled card>
          Custom domain
          <template #end-text>Not available on this plan.</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
