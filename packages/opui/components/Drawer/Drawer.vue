<script setup lang="ts">
import { computed, provide, reactive, useAttrs } from "vue"
import { autoLabelledBy } from "../id"
import { DrawerKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const {
  backdrop = "blurred",
  closedby = "any",
  id,
  scrollLock,
  side = "inline-start",
} = defineProps<Props>()
defineSlots<Slots>()

const attrs = useAttrs()
const labelledBy = computed(() => autoLabelledBy(attrs, `${id}-heading`))

provide(DrawerKey, reactive({ id: computed(() => id), titleId: labelledBy }))
</script>

<template>
  <dialog
    :id="id"
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
