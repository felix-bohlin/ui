<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <div class="column" style="gap: var(--size-4)">
    <List>
      <ListItem headline="Filled (default)" />
      <ListItem headline="Second item" />
    </List>

    <List variant="default">
      <ListItem headline="Default" />
      <ListItem headline="Second item" />
    </List>

    <List variant="tonal">
      <ListItem headline="Tonal" />
      <ListItem headline="Second item" />
    </List>

    <List variant="transparent">
      <ListItem headline="Transparent" />
      <ListItem headline="Second item" />
    </List>
  </div>
</template>
