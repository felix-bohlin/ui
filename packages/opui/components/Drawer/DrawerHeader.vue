<script setup lang="ts">
import IconButton from '../IconButton/IconButton.vue'
import type { DrawerHeaderProps } from './types'

const { class: className, heading } = defineProps<DrawerHeaderProps>()

defineOptions({
  inheritAttrs: false,
})

const closeDrawer = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement | null
  target?.closest('dialog')?.close()
}
</script>

<template>
  <div :class="['header', className]" v-bind="$attrs">
    <span v-if="heading">{{ heading }}</span>
    <slot></slot>
    <IconButton title="Close" @click="closeDrawer">
      <svg
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
    </IconButton>
  </div>
</template>
