<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
<TextField label="Amount" placeholder="0.00">
  <template #prefix>¢</template>
  <template #suffix>EUR</template>
</TextField>

<TextField label="Website" placeholder="example.com">
  <template #prefix>https://</template>
</TextField>

<TextField label="Weight" type="numeric" placeholder="0">
  <template #suffix>kg</template>
</TextField>

<TextField label="Search" placeholder="Search...">
  <template #prefix><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg></template>
</TextField>
</template>
