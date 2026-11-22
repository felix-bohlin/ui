<script setup lang="ts">
import { Field, StepButton } from "opui-css/vue"
</script>

<template>
  <Field for="number-field-stretch-1" label="Quantity">
    <input
      id="number-field-stretch-1"
      max="10"
      min="1"
      type="number"
      value="1"
    />
    <template #start>
      <StepButton command="--step-down" for="number-field-stretch-1" />
    </template>
    <template #end>
      <StepButton command="--step-up" for="number-field-stretch-1" />
    </template>
  </Field>
</template>
