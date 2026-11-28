<script setup lang="ts">
import { computed, inject } from "vue"
import { FieldsetKey } from "../Fieldset/context.vue"
import { DEV, warnReplacedId } from "../dev"
import { classAttrs } from "../cx"
import type { Props, Slots } from "./types.vue-props"

const { as: Tag = "legend", id } = defineProps<Props>()
defineSlots<Slots>()

const fieldset = inject(FieldsetKey, undefined)

const isLegend = computed(() => Tag === "legend")

if (DEV) warnReplacedId("FieldLegend", "Fieldset", id, fieldset?.legendId)
</script>

<template>
  <component
    :is="Tag"
    v-bind="classAttrs([{ 'ui-legend': !isLegend }])"
    :id="fieldset?.legendId ?? id"
  >
    <slot></slot>
  </component>
</template>
