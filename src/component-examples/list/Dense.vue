<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List dense>
    <ListItem label="Headline" />
    <ListItem
      description="Supporting text that truly is quite long enough to fill up multiple lines."
      label="Headline"
    />
    <ListItem label="Trailing supporting text">
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
