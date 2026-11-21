<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="text-field-numeric-1" label="Verification code">
    <input
      id="text-field-numeric-1"
      inputmode="numeric"
      pattern="[0-9]*"
      placeholder="123456"
    />
  </Field>
</template>
