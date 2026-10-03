<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns } from "./data"
</script>

<template>
  <DataGrid :columns="columns" label="Team" :rows="[]">
    <template #empty>
      <p>Nobody has joined the team yet.</p>
    </template>
  </DataGrid>
</template>
