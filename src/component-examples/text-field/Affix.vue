<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField for="text-field-affix-1" label="Amount">
    <input
      aria-describedby="text-field-affix-1-start text-field-affix-1-end"
      id="text-field-affix-1"
      placeholder="0.00"
    />
    <template #start>€</template>
    <template #end>EUR</template>
  </TextField>

  <TextField for="text-field-affix-2" label="Website">
    <input
      aria-describedby="text-field-affix-2-start"
      id="text-field-affix-2"
      placeholder="example.com"
    />
    <template #start>https://</template>
  </TextField>

  <TextField for="text-field-affix-3" label="Weight">
    <input
      aria-describedby="text-field-affix-3-end"
      id="text-field-affix-3"
      inputmode="decimal"
      placeholder="0"
    />
    <template #end>kg</template>
  </TextField>

  <TextField for="text-field-affix-4" label="Search">
    <input
      aria-describedby="text-field-affix-4-start"
      id="text-field-affix-4"
      placeholder="Search..."
    />
    <template #start>
      <svg
        data-icon="search"
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
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </template>
  </TextField>
</template>
