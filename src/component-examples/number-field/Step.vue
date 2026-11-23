<script setup lang="ts">
import { Field, StepButton } from "opui-css/vue"
</script>

<template>
  <Field autoFit for="number-field-step-1" label="Opacity">
    <input
      id="number-field-step-1"
      max="1"
      min="0"
      step="0.1"
      type="number"
      :value.attr="'0.5'"
    />
    <template #start>
      <StepButton command="--step-down" for="number-field-step-1" />
    </template>
    <template #end>
      <StepButton command="--step-up" for="number-field-step-1" />
    </template>
  </Field>
</template>
