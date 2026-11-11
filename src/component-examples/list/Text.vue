<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Lena Ek" />
    <ListItem
      description="Frontend developer. Builds the checkout and the account pages, and reviews most of the CSS changes."
      label="Tom Tanaka"
    />
    <ListItem label="Elif Rahman">
      <p>Support lead</p>
      <p>Replies within a day</p>
    </ListItem>
  </List>
</template>
