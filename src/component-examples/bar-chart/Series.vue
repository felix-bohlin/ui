<script setup lang="ts">
import { BarChart } from "opui-css/vue"

const rows = [
  { label: "Q1", values: [320, 140, 45] },
  { label: "Q2", values: [380, 165, 60] },
  { label: "Q3", values: [410, 190, 85] },
  { label: "Q4", values: [455, 230, 110] },
]
</script>

<template>
  <BarChart
    caption="Signups per quarter"
    label="Quarter"
    :rows="rows"
    :series="['Free', 'Pro', 'Team']"
  />
</template>
