<script setup lang="ts">
import {
  computed,
  type HTMLAttributes,
  provide,
  reactive,
  useAttrs,
  useId,
} from "vue"
import { FieldsetKey } from "./context.vue"
import { autoLabelledBy } from "../id"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { as: Tag = "fieldset" } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const uid = useId()

const isFieldset = computed(() => Tag === "fieldset")

const legendId = computed(() =>
  isFieldset.value
    ? undefined
    : autoLabelledBy(attrs, `${attrs.id || `fieldset-${uid}`}-legend`),
)

provide(FieldsetKey, reactive({ legendId }))
</script>

<template>
  <component
    :is="Tag"
    :aria-labelledby="legendId"
    :class="['ui-fieldset', $props.class]"
    :role="isFieldset ? undefined : 'group'"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </component>
</template>
