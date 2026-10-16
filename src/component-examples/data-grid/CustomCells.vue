<script setup lang="ts">
import { Avatar, Chip, DataGrid, Progress } from "opui-css/vue"
import { initials, people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { key: "status", label: "Status" },
  { key: "progress", label: "Progress", width: "minmax(10rem, 1fr)" },
]
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people">
    <template #cell-name="{ row }">
      <Avatar>{{ initials(row.name) }}</Avatar>
      {{ row.name }}
    </template>
    <template #cell-status="{ row }">
      <Chip :label="String(row.status)" size="small" />
    </template>
    <template #cell-progress="{ row }">
      <Progress
        :aria-label="`Progress, ${row.name}`"
        :max="100"
        :value="Number(row.progress)"
      />
    </template>
  </DataGrid>
</template>
