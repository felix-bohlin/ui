<script setup lang="ts">
import { Avatar, AvatarGroup, Badge } from "opui-css/vue"
</script>

<template>
  <AvatarGroup aria-label="Team">
    <Avatar aria-label="Anna Berg" role="img">AB</Avatar>
    <Avatar aria-label="Carl Dahl" role="img">CD</Avatar>
    <Avatar as="button"
      ><span aria-label="Eva Falk" role="img">EF</span></Avatar
    >
    <Avatar as="button"
      ><span aria-label="Gustav Holm" role="img">GH</span></Avatar
    >
    <Avatar href="#"
      ><span aria-label="Ida Jansson" role="img">IJ</span></Avatar
    >
    <Avatar href="#"><span aria-label="Karl Lund" role="img">KL</span></Avatar>
    <Badge dot label="Online">
      <Avatar href="#"
        ><span aria-label="Maja Nilsson" role="img">MN</span></Avatar
      >
    </Badge>
  </AvatarGroup>
</template>
