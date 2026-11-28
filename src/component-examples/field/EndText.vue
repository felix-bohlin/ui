<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field
    endText="We never share your email."
    for="field-end-text-1"
    label="Email"
  >
    <input
      aria-describedby="field-end-text-1-end-text"
      id="field-end-text-1"
      placeholder="name@example.com"
      type="email"
    />
  </Field>
</template>
