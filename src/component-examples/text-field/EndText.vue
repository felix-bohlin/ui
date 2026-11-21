<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField
    endText="We never share your email."
    for="text-field-end-text-1"
    label="Email"
  >
    <input
      aria-describedby="text-field-end-text-1-end-text"
      id="text-field-end-text-1"
      placeholder="name@example.com"
      type="email"
    />
  </TextField>
</template>
