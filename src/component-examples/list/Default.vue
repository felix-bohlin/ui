<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem headline="Headline" />
    <ListItem
      headline="Headline"
      description="Supporting text that truly is quite long enough to fill up multiple lines."
    />
    <ListItem headline="Trailing supporting text">
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
