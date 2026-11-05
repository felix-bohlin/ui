<script setup lang="ts">
import { Avatar, AvatarGroup, Badge } from "opui-css/vue"
</script>

<template>
  <AvatarGroup aria-label="Team">
    <Avatar aria-label="Anna Berg" role="img">AB</Avatar>
    <Avatar aria-label="Carl Dahl" role="img">CD</Avatar>
    <Avatar aria-label="Eva Falk" as="button">EF</Avatar>
    <Avatar aria-label="Gustav Holm" as="button">GH</Avatar>
    <Avatar aria-label="Ida Jansson" href="#">IJ</Avatar>
    <Avatar aria-label="Karl Lund" href="#">KL</Avatar>
    <Badge dot label="Online">
      <Avatar aria-label="Maja Nilsson" href="#">MN</Avatar>
    </Badge>
  </AvatarGroup>
</template>
