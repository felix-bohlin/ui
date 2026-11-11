<script setup lang="ts">
import "../../elements/close-on-navigate.js"
import {
  computed,
  type HTMLAttributes,
  provide,
  reactive,
  useAttrs,
  useId,
} from "vue"
import { PopoverKey } from "./context.vue"
import { warnMissingId } from "../dev"
import { autoLabelledBy } from "../id"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const {
  align,
  closeOnNavigate,
  id,
  popover = "auto",
  side,
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const uid = useId()

const titleId = computed(() => `${id || `popover-${uid}`}-title`)

const labelledBy = computed(() => autoLabelledBy(attrs, titleId.value))

warnMissingId("Popover", id)

provide(PopoverKey, reactive({ id: computed(() => id), titleId: labelledBy }))
</script>

<template>
  <div
    :aria-labelledby="labelledBy"
    :class="[
      'ui-popover',
      { 'ui-align-end': align === 'end' },
      side && side !== 'block-end' && `ui-${side}`,
      $props.class,
    ]"
    :data-close-on-navigate="closeOnNavigate ? '' : undefined"
    :id="id"
    :popover="popover === 'auto' ? '' : popover"
    role="dialog"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </div>
</template>
