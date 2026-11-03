<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { as: Tag = "fieldset" } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component
    :is="Tag"
    :class="['ui-fieldset', $props.class]"
    :role="Tag === 'fieldset' ? undefined : 'group'"
  >
    <slot></slot>
  </component>
</template>
