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
  <ListItem headline="Headline">
    <p>Supporting text</p>
    <p>Even more supporting text</p>
  </ListItem>
</List>
</template>
