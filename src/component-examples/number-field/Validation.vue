<script setup lang="ts">
import { Field, StepButton } from "opui-css/vue"
</script>

<template>
  <Field autoFit for="number-field-validation-1" label="Bandmates">
    <input id="number-field-validation-1" min="1" required type="number" />
    <template #start>
      <StepButton command="--step-down" for="number-field-validation-1" />
    </template>
    <template #end>
      <StepButton command="--step-up" for="number-field-validation-1" />
    </template>
  </Field>
  <Field
    autoFit
    endText="Only 4 sets of flatwounds left, whoops."
    for="number-field-validation-2"
    label="Quantity"
  >
    <input
      aria-describedby="number-field-validation-2-end-text"
      aria-invalid="true"
      id="number-field-validation-2"
      min="1"
      type="number"
      :value.attr="'6'"
    />
    <template #start>
      <StepButton command="--step-down" for="number-field-validation-2" />
    </template>
    <template #end>
      <StepButton command="--step-up" for="number-field-validation-2" />
    </template>
  </Field>
</template>
