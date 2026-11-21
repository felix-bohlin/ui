<script setup lang="ts">
import { classAttrs } from "../cx"
import type { Props } from "./types.vue-props"

defineProps<Props>()
</script>

<template>
  <button v-bind="classAttrs($props.class)">
    <selectedcontent v-pre></selectedcontent>
  </button>
</template>
