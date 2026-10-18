<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem as="button" headline="Button list item" />
    <ListItem as="a" href="#clickable-list-item" headline="Link list item" />
    <ListItem type="checkbox" headline="Checkbox list item">
      <template #end><CheckboxInput /></template>
    </ListItem>
  </List>
</template>
