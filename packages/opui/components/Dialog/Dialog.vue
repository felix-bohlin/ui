<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue"
import { DialogKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const { closedby } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const headerId = `dialog-header-${useId()}`
const labelledBy = computed(() =>
  attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : headerId,
)

provide(DialogKey, labelledBy)
</script>

<template>
  <dialog
    :aria-labelledby="labelledBy"
    :class="['ui-dialog', 'ui-card', 'ui-elevated', $props.class]"
    :closedby="closedby"
    v-bind="$attrs"
  >
    <slot></slot>
  </dialog>
</template>
