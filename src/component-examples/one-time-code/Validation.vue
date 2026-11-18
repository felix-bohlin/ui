<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    endText="That code has expired. Request a new one."
    error
    label="Verification code"
    name="code"
    required
    value="482193"
  />
</template>
