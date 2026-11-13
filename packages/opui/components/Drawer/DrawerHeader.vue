<script setup lang="ts">
import { computed, inject } from "vue"
import { TrimmedSlot } from "../whitespace.vue"
import Button from "../Button/Button.vue"
import { DrawerKey } from "./context.vue"
import { warnMissingTarget } from "../dev"
import { closePath } from "./icons"
import type {
  DrawerHeaderProps as Props,
  DrawerHeaderSlots,
} from "./types.vue-props"

const { closeButton, closeLabel = "Close", commandfor } = defineProps<Props>()
defineSlots<DrawerHeaderSlots>()

const drawer = inject(DrawerKey, undefined)

const target = computed(() => commandfor ?? drawer?.id)

if (closeButton) warnMissingTarget("DrawerHeader", target.value, "Drawer")
</script>

<template>
  <div :class="['ui-header', $props.class]">
    <TrimmedSlot :nodes="$slots.default?.()" /><Button
      v-if="closeButton"
      :aria-label="closeLabel"
      command="close"
      :commandfor="target"
      round
      size="small"
      ><slot v-if="$slots['close-icon']" name="close-icon"></slot>
      <svg
        v-else
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path fill="currentColor" :d="closePath" /></svg
    ></Button>
  </div>
</template>
