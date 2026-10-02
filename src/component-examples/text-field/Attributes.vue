<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField
    label="Email"
    type="email"
    required
    data-testid="email"
    placeholder="name@example.com"
  />
</template>
