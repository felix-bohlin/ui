<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field
    endText="Set it to 20 or more to hear alarms."
    for="range-validation-1"
    label="Alarm volume"
  >
    <input
      aria-describedby="range-validation-1-end-text"
      aria-invalid="true"
      id="range-validation-1"
      type="range"
      :value.attr="'10'"
    />
  </Field>
</template>
