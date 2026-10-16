<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="people">
    <template #detail="{ row }">
      <p>{{ row.name }} joined in {{ row.joined }}. Contact: {{ row.email }}</p>
    </template>
  </DataGrid>
</template>
