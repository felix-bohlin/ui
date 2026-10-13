<script setup lang="ts">
import { computed, provide, reactive, useAttrs, useId } from "vue"
import { DrawerKey, type Props, type Slots } from "./types.d.vue"

const {
  backdrop = "blurred",
  closedby = "any",
  id,
  scrollLock = true,
  side = "inline-start",
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const uid = useId()
const drawerId = computed(() => id || `drawer-${uid}`)
const titleId = computed(() => `${drawerId.value}-heading`)
const labelledBy = computed(() =>
  attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : titleId.value,
)

provide(DrawerKey, reactive({ id: drawerId, titleId: labelledBy }))
</script>

<template>
  <dialog
    :id="drawerId"
    :aria-labelledby="labelledBy"
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
    <slot></slot>
  </dialog>
</template>
