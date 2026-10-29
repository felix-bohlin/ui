<script setup lang="ts">
import { List, ListItem, SwitchInput } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="switch">
      <template #label>Switch 1</template>
      <template #end><SwitchInput /></template>
    </ListItem>
    <ListItem type="switch">
      <template #label>Switch 2</template>
      <template #end><SwitchInput /></template>
    </ListItem>
  </List>
</template>
