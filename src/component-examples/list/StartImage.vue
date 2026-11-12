<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem description="48 photos" label="Summer in Lisbon">
      <template #start>
        <img
          src="/photos/lena-handen.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </template>
    </ListItem>
    <ListItem description="112 photos" label="Team offsite">
      <template #start>
        <img
          src="/photos/lena-handen.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </template>
    </ListItem>
  </List>
</template>
