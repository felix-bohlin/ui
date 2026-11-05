<script setup lang="ts">
import { computed, type HTMLAttributes, inject, useAttrs } from "vue"
import { FieldsetKey } from "../Fieldset/context.vue"
import { warnReplacedId } from "../dev"
import type { Props, Slots } from "./types.vue-props"

const { as: Tag = "legend" } = defineProps<Props>()
defineSlots<Slots>()

const attrs = useAttrs() as HTMLAttributes

const fieldset = inject(FieldsetKey, undefined)

const isLegend = computed(() => Tag === "legend")

warnReplacedId("FieldLegend", "Fieldset", attrs.id, fieldset?.legendId)
</script>

<template>
  <component
    :is="Tag"
    :class="[{ 'ui-legend': !isLegend }, $props.class]"
    :id="fieldset?.legendId ?? attrs.id"
  >
    <slot></slot>
  </component>
</template>
