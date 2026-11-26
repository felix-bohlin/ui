<script setup lang="ts">
import { computed, type HTMLAttributes, provide, reactive, useAttrs } from "vue"
import { AnchorKey } from "./context.vue"
import { DEV, warnMissingId } from "../dev"
import { mergeStyle, styleAttrs } from "../style"
import { extendsAnchor } from "./root"
import { classAttrs } from "../cx"
import type { Props, Slots } from "./types.vue-props"

const { id: idProp, positionArea, trigger } = defineProps<Props>()
defineSlots<Slots>()

const attrs = useAttrs() as HTMLAttributes

const isHover = computed(() => trigger === "hover")

const id = computed(() => (isHover.value ? idProp || undefined : undefined))

if (DEV && isHover.value && !extendsAnchor(attrs.class)) {
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
    v-bind="{
      ...classAttrs([!extendsAnchor($attrs.class) && 'ui-anchor']),
      ...styleAttrs(
        mergeStyle({ '--ui-anchor-position-area': positionArea }, {}),
      ),
    }"
    :id="isHover ? undefined : idProp"
  >
    <slot></slot>
  </span>
</template>
