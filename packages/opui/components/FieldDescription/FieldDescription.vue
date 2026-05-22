<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const props = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <p :class="['field-description', props.class]" v-bind="$attrs">
    <slot></slot>
  </p>
</template>
