<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  {
    key: "name",
    label: "Name",
    rowHeader: true,
    sortable: true,
    width: "13rem",
  },
  { key: "role", label: "Role", width: "10rem" },
  { key: "email", label: "Email", width: "14rem" },
  { key: "city", label: "Location", sortable: true, width: "10rem" },
  {
    key: "tickets",
    label: "Tickets",
    numeric: true,
    sortable: true,
    width: "9rem",
  },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    dir="rtl"
    label="Team"
    max-block-size="16rem"
    numbered
    pin-end
    pin-start
    :rows="people"
    selectable
  >
    <template #detail="{ row }">
      <p>{{ row.email }}</p>
    </template>
  </DataGrid>
</template>
