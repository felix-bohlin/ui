<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, sortable: true },
  { key: "city", label: "Location", sortable: true },
  { key: "tickets", label: "Tickets", numeric: true, sortable: true },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" numbered :rows="people" />
</template>
