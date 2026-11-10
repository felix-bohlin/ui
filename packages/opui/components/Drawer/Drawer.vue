<script setup lang="ts">
import { computed, type HTMLAttributes, provide, reactive, useAttrs } from "vue"
import { DrawerKey } from "./context.vue"
import { autoLabelledBy } from "../id"
import { warnMissingId } from "../dev"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const {
  backdrop = "blurred",
  closedby = "any",
  id,
  scrollLock,
  side = "inline-start",
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const labelledBy = computed(() => autoLabelledBy(attrs, `${id}-title`))

warnMissingId("Drawer", id)

provide(DrawerKey, reactive({ id: computed(() => id), titleId: labelledBy }))
</script>

<template>
  <dialog
    :closedby="closedby"
    :class="[
      'ui-drawer',
      {
        'ui-backdrop-transparent': backdrop === 'transparent',
        'ui-scroll-lock': scrollLock,
      },
      side && side !== 'inline-start' && `ui-${side}`,
      $props.class,
    ]"
    :aria-labelledby="labelledBy"
    :id="id"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </dialog>
</template>
