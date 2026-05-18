<script setup lang="ts">
import { useId, useSlots } from 'vue'
import type { Props } from './types'

const {
  backdrop = 'blurred',
  class: className,
  closedby = 'any',
  id,
  scrollLock = true,
  side = 'inline-start',
} = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const slots = useSlots()
const drawerId = id || useId()
</script>

<template>
  <dialog
    :id="drawerId"
    :class="[
      'drawer',
      side,
      {
        'backdrop-transparent': backdrop === 'transparent',
        'scroll-lock': scrollLock,
      },
      className,
    ]"
    :closedby="closedby"
    v-bind="$attrs"
  >
    <slot v-if="slots.header" name="header"></slot>

    <div class="content">
      <slot name="content"></slot>
    </div>

    <slot v-if="slots.footer" name="footer"></slot>
  </dialog>
</template>
