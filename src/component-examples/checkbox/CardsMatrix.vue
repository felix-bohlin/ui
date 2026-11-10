<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Add-ons</FieldLegend>
      <FieldGroup name="checkbox-cards-end" orientation="horizontal">
        <Checkbox card checked spread value="support">
          Priority support
          <template #end-text>€8 per month</template>
        </Checkbox>
        <Checkbox card spread value="storage" variant="elevated">
          Extra storage
          <template #end-text>€4 per month</template>
        </Checkbox>
        <Checkbox card spread value="audit-log" variant="tonal">
          Audit log
          <template #end-text>€6 per month</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Email reports</FieldLegend>
      <FieldGroup name="checkbox-cards-start" orientation="horizontal">
        <Checkbox card checked value="weekly">
          Weekly summary
          <template #end-text>Every Monday morning.</template>
        </Checkbox>
        <Checkbox card value="usage" variant="elevated">
          Usage alerts
          <template #end-text>At 80% of your plan.</template>
        </Checkbox>
        <Checkbox card value="invoices" variant="tonal">
          Invoices
          <template #end-text>After each payment.</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
