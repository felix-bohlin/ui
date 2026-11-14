<script setup lang="ts">
import { computed, type HTMLAttributes, inject, useAttrs } from "vue"
import { CalloutKey } from "./context.vue"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { CalloutIconProps as Props } from "./types.vue-props"

defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const callout = inject(CalloutKey, undefined)

const severity = computed(() => callout?.severity)
</script>

<template>
  <svg
    v-if="severity && severity !== 'neutral'"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    v-bind="{ ...defined(attrs), ...classAttrs([$props.class]) }"
  ></svg>
</template>
