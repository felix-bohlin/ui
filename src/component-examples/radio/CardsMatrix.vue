<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Plan</FieldLegend>
      <FieldGroup name="radio-cards-end" orientation="horizontal">
        <Radio card checked spread value="starter">
          Starter
          <template #end-text>€0 per month</template>
        </Radio>
        <Radio card spread value="team" variant="elevated">
          Team
          <template #end-text>€12 per person per month</template>
        </Radio>
        <Radio card spread value="business" variant="tonal">
          Business
          <template #end-text>€24 per person per month</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Billing</FieldLegend>
      <FieldGroup name="radio-cards-start" orientation="horizontal">
        <Radio card checked value="monthly">
          Monthly
          <template #end-text>Cancel at any time.</template>
        </Radio>
        <Radio card value="yearly" variant="elevated">
          Yearly
          <template #end-text>Two months free.</template>
        </Radio>
        <Radio card value="invoice" variant="tonal">
          Invoice
          <template #end-text>Pay by bank transfer.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
