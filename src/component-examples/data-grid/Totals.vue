<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "city", label: "Location" },
  { key: "joined", label: "Joined", numeric: true },
  { key: "tickets", label: "Tickets", numeric: true, sum: true },
]
</script>

<template>
  <DataGrid :columns="columns" footer label="Team" :rows="people" selectable />
</template>
