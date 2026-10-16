<script setup lang="ts">
import { computed, inject } from "vue"
import { CalloutKey } from "./context.vue"
import { icons } from "./icons"
import type { CalloutIconProps as Props } from "./types.d.vue"

defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const callout = inject(CalloutKey, undefined)
const icon = computed(() =>
  callout?.severity === "neutral"
    ? undefined
    : callout?.severity && icons[callout.severity],
)
</script>

<template>
  <svg
    v-if="icon"
    aria-hidden="true"
    :class="[$props.class]"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    :viewBox="icon.viewBox"
    v-bind="$attrs"
  >
    <path fill="currentColor" :d="icon.d" />
  </svg>
</template>
