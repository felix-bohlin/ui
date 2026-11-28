<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="text-field-numeric-1" label="Card number">
    <input
      autocomplete="cc-number"
      id="text-field-numeric-1"
      inputmode="numeric"
      pattern="[0-9]*"
    />
  </Field>
</template>
