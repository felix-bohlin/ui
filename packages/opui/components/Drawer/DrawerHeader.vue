<script setup lang="ts">
import { computed, inject } from "vue"
import Button from "../Button/Button.vue"
import { DrawerKey } from "./context.vue"
import { closePath } from "./icons"
import type { DrawerHeaderProps, Slots } from "./types.d.vue"

const { closeLabel = "Close", commandfor } = defineProps<DrawerHeaderProps>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const drawer = inject(DrawerKey, undefined)

const closeAttrs = computed(() =>
  commandfor || drawer
    ? { command: "close", commandfor: commandfor ?? drawer?.id }
    : { onclick: "this.closest('dialog').close()" },
)
</script>

<template>
  <div :class="['ui-header', $props.class]" v-bind="$attrs">
    <slot></slot>
    <Button :aria-label="closeLabel" round size="small" v-bind="closeAttrs">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path fill="currentColor" :d="closePath"></path>
      </svg>
    </Button>
  </div>
</template>
