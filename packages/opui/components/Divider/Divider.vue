<script setup lang="ts">
import type { Props } from "./types.d.vue"

const { variant } = defineProps<Props>()
</script>

<template>
  <hr :class="['ui-divider', variant && `ui-${variant}`, $props.class]" />
</template>
