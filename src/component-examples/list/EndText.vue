<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Headline">
      <template #end>30kB</template>
    </ListItem>
    <ListItem description="Supporting text" label="Headline">
      <template #end>99%</template>
    </ListItem>
    <ListItem
      description="Supporting text that truly is quite long enough to fill up multiple lines."
      label="Headline"
    >
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
