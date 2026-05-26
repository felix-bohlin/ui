<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
<List>
  <ListItem headline="Headline">
    <template #end><div>30kB</div></template>
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    <template #end><div>99%</div></template>
  </ListItem>
  <ListItem headline="Headline">
    <template #description><p>
      Supporting text that truly is quite long enough to fill up multiple lines.
    </p></template>
    <template #end><div>100+</div></template>
  </ListItem>
</List>
</template>
