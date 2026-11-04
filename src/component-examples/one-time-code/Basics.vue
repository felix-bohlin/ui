<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    endText="The code expires in 10 minutes."
    label="Verification code"
    name="code"
    required
  />
</template>
