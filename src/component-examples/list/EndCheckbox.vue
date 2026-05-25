<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
<List>
  <ListItem type="checkbox" for="checkbox-example-1">
    <template #text><div>Checkbox 1</div></template>
    <template #end><CheckboxInput id="checkbox-example-1" /></template>
  </ListItem>
  <ListItem type="checkbox" for="checkbox-example-2">
    <template #text><div>Checkbox 2</div></template>
    <template #end><CheckboxInput id="checkbox-example-2" /></template>
  </ListItem>
</List>
</template>
