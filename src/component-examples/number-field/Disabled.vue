<script setup lang="ts">
import { Field, StepButton } from "opui-css/vue"
</script>

<template>
  <Field autoFit for="number-field-disabled-1" label="Quantity">
    <input
      disabled
      id="number-field-disabled-1"
      type="number"
      :value.attr="'1'"
    />
    <template #start>
      <StepButton command="--step-down" for="number-field-disabled-1" />
    </template>
    <template #end>
      <StepButton command="--step-up" for="number-field-disabled-1" />
    </template>
  </Field>
</template>
