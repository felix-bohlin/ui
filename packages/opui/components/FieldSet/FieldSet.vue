<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { as = "fieldset" } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <component
    :is="as"
    :class="['ui-fieldset', $props.class]"
    :role="as === 'fieldset' ? undefined : 'group'"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>
