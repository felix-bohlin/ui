<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="checkbox">
      <template #text>Checkbox 1</template>
      <template #end><CheckboxInput /></template>
    </ListItem>
    <ListItem type="checkbox">
      <template #text>Checkbox 2</template>
      <template #end><CheckboxInput /></template>
    </ListItem>
  </List>
</template>
