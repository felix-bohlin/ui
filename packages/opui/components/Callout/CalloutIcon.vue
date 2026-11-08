<script setup lang="ts">
import { computed, type HTMLAttributes, inject, useAttrs } from "vue"
import { CalloutKey } from "./context.vue"
import { iconFor } from "./icons"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { CalloutIconProps as Props } from "./types.vue-props"

defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const callout = inject(CalloutKey, undefined)

const icon = computed(() => iconFor(callout?.severity))
</script>

<template>
  <svg
    v-if="icon"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    :viewBox="icon.viewBox"
    v-bind="{ ...defined(attrs), ...classAttrs([$props.class]) }"
  >
    <path fill="currentColor" :d="icon.d" />
  </svg>
</template>
