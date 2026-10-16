<script setup lang="ts">
import { BarChart } from "opui-css/vue"

const rows = [
  { label: "Jan", values: [412] },
  { label: "Feb", values: [455] },
  { label: "Mar", values: [498] },
  { label: "Apr", values: [471] },
  { label: "May", values: [538] },
  { label: "Jun", values: [602] },
]
</script>

<template>
  <BarChart
    caption="Orders per month"
    label="Month"
    :rows="rows"
    :series="['Orders']"
  />
</template>
