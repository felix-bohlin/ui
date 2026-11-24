<script setup lang="ts">
import { useId } from "vue"
import { Field, StepButton } from "opui-css/vue"

const id = useId()
</script>

<template>
  <Field autoFit endText="Up to 10 per order." :for="id" label="Quantity">
    <input
      :aria-describedby="`${id}-end-text`"
      :id="id"
      max="10"
      min="1"
      type="number"
      :value.attr="'1'"
    />
    <template #start>
      <StepButton command="--step-down" :for="id" />
    </template>
    <template #end>
      <StepButton command="--step-up" :for="id" />
    </template>
  </Field>
</template>
