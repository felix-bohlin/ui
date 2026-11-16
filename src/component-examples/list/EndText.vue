<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Slap lesson 3.pdf">
      <template #end>2.4 MB</template>
    </ListItem>
    <ListItem description="Uploaded by Lou Headstock" label="Band photo.jpg">
      <template #end>860 kB</template>
    </ListItem>
    <ListItem
      description="Every root note of the setlist, with a tiny drawing of where the drummer should look when it changes."
      label="Bass charts.pdf"
    >
      <template #end>12 MB</template>
    </ListItem>
  </List>
</template>
