<script setup lang="ts">
import { computed, provide, reactive } from "vue"
import { AnchorKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const { id: idProp, positionArea, trigger = "always" } = defineProps<Props>()
defineSlots<Slots>()

const isHover = computed(() => trigger === "hover")
const id = computed(() => (isHover.value ? idProp : undefined))

const positionStyle = computed(() =>
  positionArea ? { "--ui-anchor-position-area": positionArea } : undefined,
)

provide(
  AnchorKey,
  reactive({
    floatingId: id,
    popover: computed(() => (isHover.value ? ("hint" as const) : undefined)),
  }),
)
</script>

<template>
  <span
    :id="isHover ? undefined : idProp"
    :class="['ui-anchor', $props.class]"
    v-bind="positionStyle && { style: positionStyle }"
  >
    <slot></slot>
  </span>
</template>
