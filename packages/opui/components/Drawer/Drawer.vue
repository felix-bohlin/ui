<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue"
import type { VNode } from "vue"
import DrawerHeader from "./DrawerHeader.vue"
import { DrawerHeadingIdKey } from "./types.d.vue"
import type { DrawerSlots, Props } from "./types.d.vue"

const {
  backdrop = "blurred",
  closedby = "any",
  id,
  scrollLock = true,
  side = "inline-start",
} = defineProps<Props>()
const slots = defineSlots<DrawerSlots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const uid = useId()
const drawerId = computed(() => id || uid)
const headingId = computed(() => `${drawerId.value}-heading`)
provide(DrawerHeadingIdKey, headingId)

const flatten = (nodes: VNode[]): VNode[] =>
  nodes.flatMap((node) =>
    Array.isArray(node.children)
      ? [node, ...flatten(node.children as VNode[])]
      : [node],
  )

const labelledBy = () => {
  if (attrs["aria-label"] || attrs["aria-labelledby"]) return undefined
  for (const node of flatten(slots.header?.() ?? [])) {
    if (node.type === DrawerHeader && node.props?.heading)
      return headingId.value
    if (typeof node.type === "string" && /^h[1-6]$/.test(node.type))
      return node.props?.id
  }
  return undefined
}
</script>

<template>
  <dialog
    :id="drawerId"
    :aria-labelledby="labelledBy()"
    :class="[
      'ui-drawer',
      side && `ui-${side}`,
      {
        'ui-backdrop-transparent': backdrop === 'transparent',
        'ui-scroll-lock': scrollLock,
      },
      $props.class,
    ]"
    :closedby="closedby"
    v-bind="$attrs"
  >
    <slot v-if="slots.header" name="header"></slot>

    <div v-if="slots.content" class="ui-content">
      <slot name="content"></slot>
    </div>

    <slot></slot>

    <slot v-if="slots.footer" name="footer"></slot>
  </dialog>
</template>
