<script setup lang="ts">
import type { Props } from "./types.vue-props"

defineProps<Props>()
</script>

<template>
  <button>
    <selectedcontent v-pre></selectedcontent>
  </button>
</template>
