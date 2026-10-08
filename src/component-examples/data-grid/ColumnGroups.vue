<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "role", label: "Role" },
  { key: "city", label: "Location" },
  { key: "tickets", label: "Tickets", numeric: true },
  { key: "progress", label: "Progress", numeric: true },
]

const columnGroups = [
  { label: "Person", span: 3 },
  { label: "Work", span: 2 },
]
</script>

<template>
  <DataGrid
    :column-groups="columnGroups"
    :columns="columns"
    label="Team"
    :rows="people"
  />
</template>
