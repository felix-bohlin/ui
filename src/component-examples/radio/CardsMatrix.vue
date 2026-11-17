<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Plan</FieldLegend>
      <FieldGroup name="radio-cards-end" orientation="horizontal">
        <Radio card checked spread value="basic">
          Basic
          <template #end-text>€0 per month, forever</template>
        </Radio>
        <Radio card spread value="gold" variant="elevated">
          Gold
          <template #end-text>€3 per month, shiny badge included</template>
        </Radio>
        <Radio card spread value="platinum" variant="tonal">
          Platinum
          <template #end-text>€5 per month, extra sparkly</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Billing</FieldLegend>
      <FieldGroup name="radio-cards-start" orientation="horizontal">
        <Radio card checked value="monthly">
          Monthly
          <template #end-text>Cancel any time, no hard feelings.</template>
        </Radio>
        <Radio card value="yearly" variant="elevated">
          Yearly
          <template #end-text>Two months free, woohoo.</template>
        </Radio>
        <Radio card value="gig-money" variant="tonal">
          Gig money
          <template #end-text>Pay in coins after your next gig.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
