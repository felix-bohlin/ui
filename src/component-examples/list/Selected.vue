<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem
      aria-current="page"
      description="12 unread"
      href="#selected"
      label="Inbox"
    />
    <ListItem href="#selected" label="Sent" />
  </List>
</template>
