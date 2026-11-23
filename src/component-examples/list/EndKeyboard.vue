<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Save all">
      <template #end><kbd>CTRL+ALT+DEL</kbd></template>
    </ListItem>
    <ListItem headline="Save">
      <template #end><kbd>CTRL+S</kbd></template>
    </ListItem>
  </List>
</template>
