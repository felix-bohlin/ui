<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField
    inputmode="numeric"
    label="Verification code"
    pattern="[0-9]*"
    placeholder="123456"
  />
</template>
