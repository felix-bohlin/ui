<script setup lang="ts">
import { Avatar, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Mohini Hertz">
      <template #start>
        <Avatar>MH</Avatar>
      </template>
    </ListItem>
    <ListItem description="Fretless enthusiast" label="Kinga Headstock">
      <template #start>
        <Avatar src="/photos/kinga-headstock.png" />
      </template>
    </ListItem>
  </List>
</template>
