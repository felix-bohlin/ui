<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem
      href="#"
      aria-current="page"
      label="Selected item"
      description='This item has aria-current="page" on its link'
    />
    <ListItem href="#" label="Normal item" />
  </List>
</template>
