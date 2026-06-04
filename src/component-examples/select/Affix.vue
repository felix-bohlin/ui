<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Currency">
    <template #prefix>¢</template>
    <option value="">-</option>
    <option>EUR</option>
    <option>EUR</option>
    <option>SEK</option>
  </Select>

  <Select label="Country">
    <template #prefix
      ><svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M2 12h20"></path>
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        ></path></svg
    ></template>
    <option value="">-</option>
    <option>Sweden</option>
    <option>Norway</option>
    <option>Denmark</option>
  </Select>
</template>
