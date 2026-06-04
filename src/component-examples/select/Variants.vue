<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Label">
    <option value="">-</option>
    <option>Outlined (default)</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>

  <Select label="Label" variant="filled">
    <option value="">-</option>
    <option>Filled</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
</template>
