<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    label="Verification code"
    endText="Enter all 6 digits."
    error
    name="code"
    required
    value="4821"
  />
</template>
