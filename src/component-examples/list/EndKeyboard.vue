<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Save all">
      <template #end
        ><div><kbd>CTRL+ALT+DEL</kbd></div></template
      >
    </ListItem>
    <ListItem headline="Save">
      <template #end
        ><div><kbd>CTRL+S</kbd></div></template
      >
    </ListItem>
  </List>
</template>
