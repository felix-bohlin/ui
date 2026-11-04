<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    endText="Enter all 6 digits."
    error
    label="Verification code"
    name="code"
    required
    value="4821"
  />
</template>
