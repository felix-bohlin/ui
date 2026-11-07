<script setup lang="ts">
import { Avatar } from "opui-css/vue"
</script>

<template>
  <Avatar
    alt="Jonas Berg"
    shape="rounded"
    src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?w=96&h=96&fit=crop&auto=format"
  />

  <Avatar aria-label="Sam Quist" role="img" shape="squared">SQ</Avatar>

  <Avatar
    alt="Sara Kim"
    shape="squircle"
    src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?w=96&h=96&fit=crop&auto=format"
  />
</template>
