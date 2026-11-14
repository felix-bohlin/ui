<script setup lang="ts">
import { Avatar, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Ines Hertz">
      <template #start>
        <Avatar aria-hidden="true">IH</Avatar>
      </template>
    </ListItem>
    <ListItem description="Fretless enthusiast" label="Lou Headstock">
      <template #start>
        <Avatar>
          <img
            src="/photos/lou-headstock.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        </Avatar>
      </template>
    </ListItem>
  </List>
</template>
