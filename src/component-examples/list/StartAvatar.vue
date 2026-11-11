<script setup lang="ts">
import { Avatar, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Elif Rahman">
      <template #start>
        <Avatar aria-hidden="true">ER</Avatar>
      </template>
    </ListItem>
    <ListItem description="Product designer" label="Lena Ek">
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
