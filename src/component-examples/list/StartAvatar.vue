<script setup lang="ts">
import { Avatar, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Ines Hertz">
      <template #start>
        <Avatar>IH</Avatar>
      </template>
    </ListItem>
    <ListItem description="Fretless enthusiast" label="Lou Headstock">
      <template #start>
        <Avatar src="/photos/lou-headstock.png" />
      </template>
    </ListItem>
  </List>
</template>
