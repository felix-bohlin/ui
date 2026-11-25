<script setup lang="ts">
import type {
  CalloutContentProps as Props,
  CalloutContentSlots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<CalloutContentSlots>()
</script>

<template>
  <div class="ui-content">
    <slot></slot>
  </div>
</template>
