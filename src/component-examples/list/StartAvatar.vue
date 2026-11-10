<script setup lang="ts">
import { Avatar, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Headline">
      <template #start>
        <Avatar aria-hidden="true">AB</Avatar>
      </template>
    </ListItem>
    <ListItem description="Supporting text" label="Headline">
      <template #start>
        <Avatar>
          <img
            src="/photos/maya-lind.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        </Avatar>
      </template>
    </ListItem>
  </List>
</template>
