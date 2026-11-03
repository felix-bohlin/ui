<script setup lang="ts">
import "../../elements/command.js"
import type { Props, Slots } from "./types.vue-props"

const { emptyLabel, filter, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component
    is="opui-command"
    :class="[
      'ui-command',
      variant && variant !== 'transparent' && `ui-${variant}`,
      $props.class,
    ]"
    :empty-label="emptyLabel"
    :filter="filter && filter !== 'auto' ? filter : undefined"
  >
    <slot></slot>
    <p role="status"></p>
  </component>
</template>
