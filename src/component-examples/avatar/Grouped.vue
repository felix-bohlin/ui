<script setup lang="ts">
import { Avatar, AvatarGroup, Badge } from "opui-css/vue"
</script>

<template>
  <AvatarGroup aria-label="Band">
    <Avatar aria-label="Ada Bridge" role="img">AB</Avatar>
    <Avatar aria-label="Holly Humbucker" role="img">HH</Avatar>
    <Avatar as="button"
      ><span aria-label="Ines Hertz" role="img">IH</span></Avatar
    >
    <Avatar as="button"
      ><span aria-label="Lou Headstock" role="img">LH</span></Avatar
    >
    <Avatar href="#"
      ><span aria-label="Percy Groove" role="img">PG</span></Avatar
    >
    <Avatar href="#"
      ><span aria-label="Rory Rootnote" role="img">RR</span></Avatar
    >
    <Badge dot label="Online">
      <Avatar href="#"
        ><span aria-label="Stella Nut, online" role="img">SN</span></Avatar
      >
    </Badge>
  </AvatarGroup>
</template>
