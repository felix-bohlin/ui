<script setup lang="ts">
import { Button, DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true, width: "11rem" },
  { key: "role", label: "Role", width: "10rem" },
  { key: "email", label: "Email", width: "14rem" },
  { key: "city", label: "Location", width: "10rem" },
  { key: "joined", label: "Joined", numeric: true, width: "8rem" },
  { key: "tickets", label: "Tickets", numeric: true, width: "8rem" },
  { fit: true, key: "actions", label: "Actions" },
]
</script>

<template>
  <DataGrid
    :columns="columns"
    label="Team"
    max-block-size="16rem"
    pin-end
    pin-start
    :rows="people"
    selectable
  >
    <template #cell-actions>
      <Button size="small">Edit</Button>
    </template>
  </DataGrid>
</template>
