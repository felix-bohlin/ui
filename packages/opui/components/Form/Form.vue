<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const props = withDefaults(defineProps<Props>(), {
  as: "form",
})
defineSlots<Slots>()
</script>

<template>
  <component :is="props.as" :class="['form', props.class]" v-bind="$attrs">
    <slot></slot>
  </component>
</template>
