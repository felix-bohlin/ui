<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
  { key: "city", label: "Location" },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" resizable :rows="people" />
</template>
