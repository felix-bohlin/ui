<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Save all">
      <template #end><kbd>Ctrl+Shift+S</kbd></template>
    </ListItem>
    <ListItem label="Save">
      <template #end><kbd>Ctrl+S</kbd></template>
    </ListItem>
  </List>
</template>
