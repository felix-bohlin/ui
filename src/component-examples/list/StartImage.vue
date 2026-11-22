<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem description="48 photos" label="Gig in a basement">
      <template #start>
        <img
          src="/photos/lou-headstock.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </template>
    </ListItem>
    <ListItem description="112 photos" label="Pedalboard glamour shots">
      <template #start>
        <img
          src="/photos/lou-headstock.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </template>
    </ListItem>
  </List>
</template>
