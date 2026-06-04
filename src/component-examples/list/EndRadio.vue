<script setup lang="ts">
import { List, ListItem, RadioInput } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="radio" for="radio-example-1">
      <template #text><div>Radio 1</div></template>
      <template #end
        ><RadioInput id="radio-example-1" name="radio-example-group"
      /></template>
    </ListItem>
    <ListItem type="radio" for="radio-example-2">
      <template #text><div>Radio 2</div></template>
      <template #end
        ><RadioInput id="radio-example-2" name="radio-example-group"
      /></template>
    </ListItem>
  </List>
</template>
