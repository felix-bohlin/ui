<script setup lang="ts">
import "../../elements/close-on-navigate.js"
import "../../elements/drawer-swipe.js"
import { computed, provide, reactive } from "vue"
import { useRestAttrs } from "../vue"
import { DrawerKey } from "./context.vue"
import { autoLabelledBy } from "../id"
import { DEV, warnMissingId } from "../dev"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const {
  backdrop = "blurred",
  closedby = "any",
  closeOnNavigate,
  id,
  scrollLock,
  side = "inline-start",
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs()

const labelledBy = computed(() => autoLabelledBy(attrs.value, `${id}-title`))

if (DEV) warnMissingId("Drawer", id)

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
      $attrs.class,
    ]"
    :aria-labelledby="labelledBy"
    :data-close-on-navigate="closeOnNavigate ? '' : undefined"
    :id="id"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </dialog>
</template>
