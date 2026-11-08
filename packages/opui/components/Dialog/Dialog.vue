<script setup lang="ts">
import {
  computed,
  type HTMLAttributes,
  provide,
  reactive,
  useAttrs,
  useId,
} from "vue"
import { DialogKey } from "./context.vue"
import { autoLabelledBy } from "../id"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { closedby } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const uid = useId()

const titleId = computed(() => `${attrs.id || `dialog-${uid}`}-title`)

const labelledBy = computed(() => autoLabelledBy(attrs, titleId.value))

provide(
  DialogKey,
  reactive({ id: computed(() => attrs.id ?? undefined), titleId: labelledBy }),
)
</script>

<template>
  <dialog
    :aria-labelledby="labelledBy"
    :class="['ui-dialog', 'ui-elevated', $props.class]"
    :closedby="closedby"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </dialog>
</template>
