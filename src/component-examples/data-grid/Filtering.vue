<script setup lang="ts">
import type { DataGridRow } from "opui-css/vue"
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"

const filters = [
  { label: "Active", match: (row: DataGridRow) => row.status === "Active" },
  { label: "Away", match: (row: DataGridRow) => row.status === "Away" },
  { label: "Selected", match: "selected" as const },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    :filters="filters"
    footer
    label="Team"
    :rows="people"
    selectable
  />
</template>
