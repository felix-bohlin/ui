<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="text-field-basics-1" label="Email">
    <input
      autocomplete="email"
      id="text-field-basics-1"
      name="email"
      type="email"
    />
  </Field>
</template>
