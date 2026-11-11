<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem description="Supporting text" label="Headline">
      <template #start>
        <img
          src="/photos/maya-lind.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </template>
    </ListItem>
    <ListItem description="Supporting text" label="Headline">
      <template #start>
        <img
          src="/photos/maya-lind.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </template>
    </ListItem>
  </List>
</template>
