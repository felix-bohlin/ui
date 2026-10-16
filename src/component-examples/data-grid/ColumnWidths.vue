<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, width: "12rem" },
  { key: "role", fit: true, label: "Role" },
  { key: "city", label: "Location", width: "2fr" },
  { key: "tickets", label: "Tickets", numeric: true },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people" />
</template>
