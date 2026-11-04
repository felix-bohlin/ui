<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem
      aria-current="page"
      description='This item has aria-current="page" on its link'
      href="#"
      label="Selected item"
    />
    <ListItem href="#" label="Normal item" />
  </List>
</template>
