<script setup lang="ts">
import { useId } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { alignment, id: idProp, trigger = "always" } = defineProps<Props>()
defineSlots<Slots>()

const isHover = trigger === "hover"
const uid = useId()
const id = isHover ? (idProp ?? uid) : undefined

const insetMap: Record<string, string> = {
  "start start": "auto 100% 100% auto",
  "start end": "auto auto 100% 100%",
  "end start": "100% 100% auto auto",
  "end end": "100% auto auto 100%",
}

const positionArea = alignment
  ? {
      "--anchor-position-area": alignment,
      "--_anchor-inset": insetMap[alignment],
    }
  : {}
</script>

<template>
  <span :class="['anchor', $props.class]" :style="positionArea">
    <span v-if="isHover" :interestfor="id">
      <slot></slot>
    </span>
    <slot v-else></slot>
    <span
      class="anchor-floating"
      :id="id"
      :popover="isHover ? 'hint' : undefined"
    >
      <slot name="anchored"></slot>
    </span>
  </span>
</template>
