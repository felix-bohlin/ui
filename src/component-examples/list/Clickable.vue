<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem as="button" label="Button list item" />
    <ListItem as="button" disabled label="Archived" />
    <ListItem href="#clickable-list-item" label="Link list item" />
    <ListItem type="checkbox" label="Checkbox list item">
      <template #end><CheckboxInput /></template>
    </ListItem>
  </List>
</template>
