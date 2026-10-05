<script setup lang="ts">
import { computed, inject } from "vue"
import Button from "../Button/Button.vue"
import { DrawerHeadingIdKey } from "./types.d.vue"
import type { DrawerHeaderProps, DrawerHeaderSlots } from "./types.d.vue"

const {
  closeLabel = "Close",
  commandfor,
  heading,
} = defineProps<DrawerHeaderProps>()
defineSlots<DrawerHeaderSlots>()

defineOptions({
  inheritAttrs: false,
})

const headingId = inject(DrawerHeadingIdKey, undefined)

const closeAttrs = computed(() =>
  commandfor
    ? { command: "close", commandfor }
    : { onclick: "this.closest('dialog').close()" },
)
</script>

<template>
  <div :class="['ui-header', $props.class]" v-bind="$attrs">
    <h2 v-if="heading" :id="headingId">{{ heading }}</h2>
    <slot></slot>
    <Button
      :aria-label="closeLabel"
      ripple
      rounded
      size="small"
      v-bind="closeAttrs"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
        ></path>
      </svg>
    </Button>
  </div>
</template>
