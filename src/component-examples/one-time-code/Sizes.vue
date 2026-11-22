<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode for="one-time-code-sizes-1" label="X-small" size="x-small">
    <input
      autocomplete="one-time-code"
      id="one-time-code-sizes-1"
      inputmode="numeric"
      maxlength="6"
      name="code-x-small"
      pattern="[0-9]{6}"
    />
  </OneTimeCode>
  <OneTimeCode for="one-time-code-sizes-2" label="Small" size="small">
    <input
      autocomplete="one-time-code"
      id="one-time-code-sizes-2"
      inputmode="numeric"
      maxlength="6"
      name="code-small"
      pattern="[0-9]{6}"
    />
  </OneTimeCode>
  <OneTimeCode for="one-time-code-sizes-3" label="Medium">
    <input
      autocomplete="one-time-code"
      id="one-time-code-sizes-3"
      inputmode="numeric"
      maxlength="6"
      name="code-medium"
      pattern="[0-9]{6}"
    />
  </OneTimeCode>
  <OneTimeCode for="one-time-code-sizes-4" label="Large" size="large">
    <input
      autocomplete="one-time-code"
      id="one-time-code-sizes-4"
      inputmode="numeric"
      maxlength="6"
      name="code-large"
      pattern="[0-9]{6}"
    />
  </OneTimeCode>
</template>
