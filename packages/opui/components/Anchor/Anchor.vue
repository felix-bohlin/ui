<script setup lang="ts">
import { computed, provide, reactive } from "vue"
import { AnchorKey } from "./context.vue"
import { warnMissingId } from "../dev"
import { mergeStyle } from "../style"
import { extendsAnchor } from "./root"
import { classAttrs } from "../cx"
import type { Props, Slots } from "./types.vue-props"

const {
  class: className,
  id: idProp,
  positionArea,
  trigger,
} = defineProps<Props>()
defineSlots<Slots>()

const isHover = computed(() => trigger === "hover")

const id = computed(() => (isHover.value ? (idProp ?? undefined) : undefined))

if (isHover.value && !extendsAnchor(className)) {
  warnMissingId("Anchor", id.value, "interestfor")
}

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
    v-bind="
      classAttrs([!extendsAnchor($props.class) && 'ui-anchor', $props.class])
    "
    :id="isHover ? undefined : idProp"
    :style="mergeStyle({ '--ui-anchor-position-area': positionArea }, {})"
  >
    <slot></slot>
  </span>
</template>
