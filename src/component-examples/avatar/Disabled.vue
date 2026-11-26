<script setup lang="ts">
import { Avatar } from "opui-css/vue"
</script>

<template>
  <Avatar as="button"><span aria-label="Eva Falk" role="img">EF</span></Avatar>
  <Avatar as="button" disabled
    ><span aria-label="Gustav Holm" role="img">GH</span></Avatar
  >
  <Avatar href="#"><span aria-label="Ida Jansson" role="img">IJ</span></Avatar>
  <Avatar disabled href="#"
    ><span aria-label="Karl Lund" role="img">KL</span></Avatar
  >
</template>
