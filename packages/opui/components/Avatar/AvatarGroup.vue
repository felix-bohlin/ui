<script setup lang="ts">
import type { AvatarGroupProps as Props, Slots } from "./types.vue-props"

const { role } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-avatar-group', $props.class]" :role="role ?? 'group'">
    <slot></slot>
  </div>
</template>
