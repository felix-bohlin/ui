<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Country" autocomplete="country" data-testid="country">
    <option value="">-</option>
    <option>Norway</option>
    <option>Sweden</option>
  </Select>
</template>
