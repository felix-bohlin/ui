<script setup lang="ts">
import type {
  CalloutActionsProps as Props,
  CalloutActionsSlots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<CalloutActionsSlots>()
</script>

<template>
  <div :class="['ui-actions', $props.class]">
    <slot></slot>
  </div>
</template>
