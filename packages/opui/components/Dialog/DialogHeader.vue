<script setup lang="ts">
import { computed, inject } from "vue"
import { TrimmedSlot } from "../whitespace.vue"
import Button from "../Button/Button.vue"
import { DialogKey } from "./context.vue"
import { warnMissingCloseTarget } from "../dev"
import type {
  DialogHeaderProps as Props,
  DialogHeaderSlots,
} from "./types.vue-props"

const { closeButton, closeLabel = "Close", commandfor } = defineProps<Props>()
defineSlots<DialogHeaderSlots>()

const dialog = inject(DialogKey, undefined)

const target = computed(() => commandfor ?? dialog?.id)

if (closeButton) warnMissingCloseTarget("DialogHeader", target.value, "Dialog")
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
      ></svg
    ></Button>
  </div>
</template>
