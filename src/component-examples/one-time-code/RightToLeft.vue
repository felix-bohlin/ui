<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <div dir="rtl" lang="ar">
    <OneTimeCode
      label="رمز التحقق"
      name="code"
      pattern="[0-9٠-٩۰-۹]{6}"
      value="905113"
    />
  </div>
</template>
