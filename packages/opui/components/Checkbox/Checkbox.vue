<script setup lang="ts">
import { provideFieldRoot } from "../Field/root.vue"
import type { CheckboxProps, Slots } from "./types.d.vue"

const props = defineProps<CheckboxProps>()
const slots = defineSlots<Slots>()

const Content = provideFieldRoot(
  () => slots.default?.(),
  () => props.error,
)
</script>

<template>
  <label
    :class="[
      'ui-checkbox',
      props.size && `ui-${props.size}`,
      {
        'ui-stack': props.stack,
        'ui-spread': props.spread,
      },
      props.class,
    ]"
  >
    <Content />
  </label>
</template>
