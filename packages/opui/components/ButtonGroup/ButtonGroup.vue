<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const props = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'button-group',
      props.color,
      props.size,
      props.variant,
      props.orientation,
      props.class,
    ]"
    role="group"
  >
    <slot></slot>
  </div>
</template>
