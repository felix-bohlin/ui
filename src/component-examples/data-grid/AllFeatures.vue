<script setup lang="ts">
import type { DataGridRow } from "opui-css/vue"
import { Avatar, Button, Chip, DataGrid } from "opui-css/vue"
import { initials, people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, sortable: true },
  { editable: true, key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "city", label: "Location", sortable: true },
  { key: "joined", label: "Joined", numeric: true, sortable: true },
  {
    key: "tickets",
    label: "Tickets",
    numeric: true,
    sortable: true,
    sum: true,
  },
  { fit: true, hideable: false, key: "actions", label: "Actions" },
]

const filters = [
  { label: "Active", match: (row: DataGridRow) => row.status === "Active" },
  { label: "Away", match: (row: DataGridRow) => row.status === "Away" },
  { label: "Selected", match: "selected" as const },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    columns-menu
    density-toggle
    :filters="filters"
    footer
    label="Team"
    max-block-size="24rem"
    pin-end
    pin-start
    :rows="people"
    selectable
  >
    <template #cell-name="{ row }">
      <Avatar>{{ initials(row.name) }}</Avatar>
      {{ row.name }}
    </template>
    <template #cell-status="{ row }">
      <Chip :label="String(row.status)" size="small" />
    </template>
    <template #cell-actions>
      <Button size="small">Edit</Button>
    </template>
    <template #detail="{ row }">
      <p>{{ row.name }} joined in {{ row.joined }}. Contact: {{ row.email }}</p>
    </template>
  </DataGrid>
</template>
