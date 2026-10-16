<script setup lang="ts">
import { Button, DataGrid } from "opui-css/vue"
import { people } from "./data"

const columns = [
  { key: "name", label: "Name", rowHeader: true },
  { editable: true, key: "role", label: "Role" },
  { key: "city", label: "Location" },
]
</script>

<template>
  <form id="team-actions" method="dialog"></form>
  <DataGrid
    :columns="columns"
    footer
    form="team-actions"
    label="Team"
    row-key="id"
    :rows="people"
    selectable
  >
    <template #actions>
      <Button form="team-actions" size="small" type="submit" variant="tonal">
        Archive
      </Button>
      <Button form="team-actions" size="small" type="reset">
        Clear selection
      </Button>
    </template>
  </DataGrid>
</template>
