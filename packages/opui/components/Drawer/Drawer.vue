<script setup lang="ts">
import { computed, provide, reactive, useAttrs, useId } from "vue"
import { autoLabelledBy } from "../id"
import { DrawerKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const {
  backdrop = "blurred",
  closedby = "any",
  id,
  scrollLock = true,
  side = "inline-start",
} = defineProps<Props>()
defineSlots<Slots>()

const attrs = useAttrs()
const uid = useId()
const drawerId = computed(() => id || `drawer-${uid}`)
const labelledBy = computed(() =>
  autoLabelledBy(attrs, `${drawerId.value}-heading`),
)

provide(DrawerKey, reactive({ id: drawerId, titleId: labelledBy }))
</script>

<template>
  <dialog
    :id="drawerId"
    :aria-labelledby="labelledBy"
    :class="[
      'ui-drawer',
      {
        'ui-backdrop-transparent': backdrop === 'transparent',
        'ui-scroll-lock': scrollLock,
      },
      side && side !== 'inline-start' && `ui-${side}`,
      $props.class,
    ]"
    :closedby="closedby"
  >
    <slot></slot>
  </dialog>
</template>
