<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

defineSlots<Slots>()
const props = defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'ui-progress',
      props.variant && `ui-${props.variant}`,
      props.class,
    ]"
  >
    <progress v-bind="$attrs" :max="props.max" :value="props.value">
      <slot></slot>
    </progress>
  </div>
</template>
