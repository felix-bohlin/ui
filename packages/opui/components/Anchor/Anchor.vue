<script setup lang="ts">
import { computed, provide, reactive, useId } from "vue"
import { AnchorKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const { alignment, id: idProp, trigger = "always" } = defineProps<Props>()
defineSlots<Slots>()

const isHover = computed(() => trigger === "hover")
const uid = useId()
const id = computed(() => (isHover.value ? (idProp ?? uid) : undefined))

const positionArea = computed(() =>
  alignment ? { "--anchor-position-area": alignment } : undefined,
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
    v-bind="positionArea && { style: positionArea }"
  >
    <slot></slot>
  </span>
</template>
