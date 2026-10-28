<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    label="Verification code"
    endText="The code expires in 10 minutes."
    name="code"
    required
  />
</template>
