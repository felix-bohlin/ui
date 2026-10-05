<script setup lang="ts">
import { computed, useId } from "vue"
import type { DrawerSlots, Props } from "./types.d.vue"

const {
  backdrop = "blurred",
  closedby = "any",
  id,
  scrollLock = true,
  side = "inline-start",
} = defineProps<Props>()
const slots = defineSlots<DrawerSlots>()

defineOptions({
  inheritAttrs: false,
})

const uid = useId()
const drawerId = computed(() => id || uid)
</script>

<template>
  <dialog
    :id="drawerId"
    :class="[
      'ui-drawer',
      side && `ui-${side}`,
      {
        'ui-backdrop-transparent': backdrop === 'transparent',
        'ui-scroll-lock': scrollLock,
      },
      $props.class,
    ]"
    :closedby="closedby"
    v-bind="$attrs"
  >
    <slot v-if="slots.header" name="header"></slot>

    <div v-if="slots.content" class="ui-content">
      <slot name="content"></slot>
    </div>

    <slot></slot>

    <slot v-if="slots.footer" name="footer"></slot>
  </dialog>
</template>
