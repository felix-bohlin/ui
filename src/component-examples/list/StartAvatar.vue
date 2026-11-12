<script setup lang="ts">
import { Avatar, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Inga Halonen">
      <template #start>
        <Avatar aria-hidden="true">IH</Avatar>
      </template>
    </ListItem>
    <ListItem description="Product designer" label="Lena Handén">
      <template #start>
        <Avatar>
          <img
            src="/photos/lena-handen.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        </Avatar>
      </template>
    </ListItem>
  </List>
</template>
