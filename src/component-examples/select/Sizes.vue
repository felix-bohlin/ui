<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="X-small" size="x-small">
    <option value="">X-small</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Small" size="small">
    <option value="">Small</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Default">
    <option value="">Default</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Large" size="large">
    <option value="">Large</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
</template>
