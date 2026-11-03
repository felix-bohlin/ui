<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { as = "fieldset" } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component
    :is="as"
    :class="['ui-fieldset', $props.class]"
    :role="as === 'fieldset' ? undefined : 'group'"
  >
    <slot></slot>
  </component>
</template>
