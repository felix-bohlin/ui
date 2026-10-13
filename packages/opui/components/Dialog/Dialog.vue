<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue"
import { DialogHeaderIdKey, type Props, type Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const headerId = `dialog-header-${useId()}`
const labelledBy = computed(() =>
  attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : headerId,
)

provide(DialogHeaderIdKey, labelledBy)
</script>

<template>
  <dialog
    :aria-labelledby="labelledBy"
    :class="['ui-dialog', 'ui-card', 'ui-elevated', $props.class]"
    v-bind="$attrs"
  >
    <slot></slot>
  </dialog>
</template>
