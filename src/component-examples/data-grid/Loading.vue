<script setup lang="ts">
import { DataGrid } from "opui-css/vue"
import { columns, people } from "./data"
</script>

<template>
  <DataGrid :columns="columns" label="Team" loading :rows="people" />
</template>
