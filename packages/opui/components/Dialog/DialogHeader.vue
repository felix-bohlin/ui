<script setup lang="ts">
import { inject } from "vue"
import { TrimmedSlot } from "../whitespace.vue"
import Button from "../Button/Button.vue"
import { DialogKey } from "./context.vue"
import { warnMissingCloseTarget } from "../dev"
import { closePath } from "./icons"
import type {
  DialogHeaderProps as Props,
  DialogHeaderSlots,
} from "./types.vue-props"

const { closeLabel } = defineProps<Props>()
defineSlots<DialogHeaderSlots>()

const dialog = inject(DialogKey, undefined)

if (closeLabel) warnMissingCloseTarget("DialogHeader", dialog?.id, "Dialog")
</script>

<template>
  <div :class="['ui-header', $props.class]">
    <TrimmedSlot :nodes="$slots.default?.()" /><Button
      v-if="closeLabel"
      :aria-label="closeLabel"
      command="close"
      :commandfor="dialog?.id"
      round
      size="small"
      ><slot v-if="$slots['close-icon']" name="close-icon"></slot
      ><svg
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
