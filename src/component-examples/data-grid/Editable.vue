<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { editable: true, key: "role", label: "Role" },
  { editable: true, key: "city", label: "Location" },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people" />
</template>
