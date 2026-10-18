<script setup lang="ts">
import { List, ListItem, RadioInput } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="radio">
      <template #text>Radio 1</template>
      <template #end
        ><RadioInput name="radio-example-group" value="1"
      /></template>
    </ListItem>
    <ListItem type="radio">
      <template #text>Radio 2</template>
      <template #end
        ><RadioInput name="radio-example-group" value="2"
      /></template>
    </ListItem>
  </List>
</template>
