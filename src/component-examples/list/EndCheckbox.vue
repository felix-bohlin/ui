<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="checkbox" for="checkbox-example-1">
      <template #text>Checkbox 1</template>
      <template #end><CheckboxInput id="checkbox-example-1" /></template>
    </ListItem>
    <ListItem type="checkbox" for="checkbox-example-2">
      <template #text>Checkbox 2</template>
      <template #end><CheckboxInput id="checkbox-example-2" /></template>
    </ListItem>
  </List>
</template>
