<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const props = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-button-group',
      props.color && `ui-${props.color}`,
      props.size && `ui-${props.size}`,
      props.variant && `ui-${props.variant}`,
      props.orientation && `ui-${props.orientation}`,
      props.class,
    ]"
    role="group"
  >
    <slot></slot>
  </div>
</template>
