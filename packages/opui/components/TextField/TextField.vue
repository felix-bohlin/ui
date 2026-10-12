<script setup lang="ts">
import { provideFieldRoot } from "../Field/root.vue"
import type { Props, Slots } from "./types.d.vue"

const props = defineProps<Props>()
const slots = defineSlots<Slots>()

const Content = provideFieldRoot(
  () => slots.default?.(),
  () => props.error,
)
</script>

<template>
  <label
    :class="[
      'ui-text-field',
      props.size && `ui-${props.size}`,
      {
        'ui-auto-fit': props.autoFit,
        'ui-filled': props.variant === 'filled',
        'ui-spread': props.spread,
      },
      props.class,
    ]"
  >
    <Content />
  </label>
</template>
