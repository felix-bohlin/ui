<script setup lang="ts">
import { Avatar } from "opui-css/vue"
</script>

<template>
  <Avatar as="button"
    ><span aria-label="Hakki Hälinen" role="img">HH</span></Avatar
  >
  <Avatar as="button" disabled
    ><span aria-label="Inga Halonen" role="img">IH</span></Avatar
  >
  <Avatar href="#"><span aria-label="Lena Handén" role="img">LH</span></Avatar>
  <Avatar disabled href="#"
    ><span aria-label="Pekka Gåpåbottanen" role="img">PG</span></Avatar
  >
</template>
