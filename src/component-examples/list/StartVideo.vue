<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><video controls muted>
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          /></video
      ></template>
      <template #end>13:37</template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #start
        ><video controls muted>
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          /></video
      ></template>
      <template #end>90s</template>
    </ListItem>
  </List>
</template>
