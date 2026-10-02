<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid
    :columns="columns"
    density="compact"
    density-toggle
    label="Team"
    :rows="people"
  />
</template>
