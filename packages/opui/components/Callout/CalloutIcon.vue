<script setup lang="ts">
import { computed, inject } from "vue"
import { CalloutKey } from "./context.vue"
import { iconFor } from "./icons"
import type { CalloutIconProps as Props } from "./types.d.vue"

defineProps<Props>()

const callout = inject(CalloutKey, undefined)
const icon = computed(() => iconFor(callout?.severity))
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
  >
    <path fill="currentColor" :d="icon.d" />
  </svg>
</template>
