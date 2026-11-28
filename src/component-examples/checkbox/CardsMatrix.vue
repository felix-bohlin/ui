<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Gold add-ons</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Checkbox card checked name="checkbox-cards-end" spread value="support">
          Priority bass help
          <template #end-text>€8 per month</template>
        </Checkbox>
        <Checkbox
          card
          name="checkbox-cards-end"
          spread
          value="storage"
          variant="elevated"
        >
          Extra slap video storage
          <template #end-text>€4 per month</template>
        </Checkbox>
        <Checkbox
          card
          name="checkbox-cards-end"
          spread
          value="audit-log"
          variant="tonal"
        >
          Gig diary
          <template #end-text>€6 per month</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Email updates</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Checkbox card checked name="checkbox-cards-start" value="weekly">
          Weekly jam recap
          <template #end-text>Every Monday morning.</template>
        </Checkbox>
        <Checkbox
          card
          name="checkbox-cards-start"
          value="usage"
          variant="elevated"
        >
          Gig alerts
          <template #end-text>When your band books a gig.</template>
        </Checkbox>
        <Checkbox
          card
          name="checkbox-cards-start"
          value="invoices"
          variant="tonal"
        >
          Gold receipts
          <template #end-text>After each payment.</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
