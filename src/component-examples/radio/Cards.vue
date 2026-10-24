<script setup lang="ts">
import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Plan</FieldLegend>
      <FieldGroup name="radio-cards">
        <Radio value="starter" checked card>
          Starter
          <template #end-text>For one person.</template>
        </Radio>
        <Radio value="team" card>
          Team
          <template #end-text>Up to ten seats and shared folders.</template>
        </Radio>
        <Radio value="enterprise" disabled card>
          Enterprise
          <template #end-text>Talk to sales.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
