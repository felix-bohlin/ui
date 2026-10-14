<script setup lang="ts">
import { computed, inject, provide } from "vue"
import { FieldGroupKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const { direction, name } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const parent = inject(FieldGroupKey, undefined)
provide(
  FieldGroupKey,
  computed(() => name || parent?.value),
)
</script>

<template>
  <div
    :class="['ui-field-group', direction && `ui-${direction}`, $props.class]"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
