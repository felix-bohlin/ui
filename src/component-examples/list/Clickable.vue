<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem as="button" disabled label="Empty trash" />
    <ListItem as="button" label="New folder" />
    <ListItem href="#clickable-list-item" label="Recent files" />
    <ListItem disabled href="#clickable-list-item" label="Shared drives" />
    <ListItem label="Show hidden files" type="checkbox">
      <template #end>
        <CheckboxInput />
      </template>
    </ListItem>
  </List>
</template>
