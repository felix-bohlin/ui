<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline">
      <template #end>30kB</template>
    </ListItem>
    <ListItem headline="Headline" description="Supporting text">
      <template #end>99%</template>
    </ListItem>
    <ListItem
      headline="Headline"
      description="Supporting text that truly is quite long enough to fill up multiple lines."
    >
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
