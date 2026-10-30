<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Amount" placeholder="0.00">
    <template #start>€</template>
    <template #end>EUR</template>
  </TextField>

  <TextField label="Website" placeholder="example.com">
    <template #start>https://</template>
  </TextField>

  <TextField label="Weight" placeholder="0" type="numeric">
    <template #end>kg</template>
  </TextField>

  <TextField label="Search" placeholder="Search...">
    <template #start
      ><svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path></svg
    ></template>
  </TextField>
</template>
