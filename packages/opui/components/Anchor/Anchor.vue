<script setup lang="ts">
import { computed, provide, reactive } from "vue"
import { warnMissingId } from "../dev"
import { AnchorKey } from "./context.vue"
import { extendsAnchor } from "./root"
import type { Props, Slots } from "./types.vue-props"

const {
  class: className,
  id: idProp,
  positionArea,
  trigger,
} = defineProps<Props>()
defineSlots<Slots>()

const isHover = computed(() => trigger === "hover")
const id = computed(() => (isHover.value ? idProp : undefined))
if (isHover.value && !extendsAnchor(className)) {
  warnMissingId("Anchor", id.value, "interestfor")
}

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
    :class="[!extendsAnchor($props.class) && 'ui-anchor', $props.class]"
    v-bind="positionStyle && { style: positionStyle }"
  >
    <slot></slot>
  </span>
</template>
