<script setup lang="ts">
import { inject } from "vue"
import { DrawerKey } from "./context.vue"
import type { DrawerTitleProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const drawer = inject(DrawerKey, undefined)
</script>

<template>
  <h2
    :class="[$props.class]"
    v-bind="$attrs"
    :id="drawer?.titleId ?? ($attrs.id as string | undefined)"
  >
    <slot></slot>
  </h2>
</template>
