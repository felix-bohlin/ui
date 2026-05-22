<script setup lang="ts">
import { computed, useAttrs } from "vue"
import type { Props, Slots } from "./types.d.vue"

const props = defineProps<Props>()
const slots = defineSlots<Slots>()
const attrs = useAttrs()

defineOptions({
  inheritAttrs: false,
})

const hasLabel = computed(
  () =>
    props.type &&
    (props.type === "checkbox" ||
      props.type === "radio" ||
      props.type === "switch"),
)
const labelClass = computed(() => props.type || "")
const Tag = computed(() => props.as)

const liAttrs = computed(() => (Tag.value ? {} : attrs))
const innerAttrs = computed(() => (Tag.value ? attrs : {}))
</script>

<template>
  <li
    :class="[
      {
        'ui-border-top': props.borderTop,
        'ui-inset': props.inset,
      },
      props.class,
    ]"
    v-bind="liAttrs"
  >
    <label
      v-if="hasLabel"
      :class="labelClass && `ui-${labelClass}`"
      :for="props.for"
    >
      <div v-if="slots.start" class="ui-start">
        <slot name="start"></slot>
      </div>
      <div
        v-if="slots.text || props.headline || props.description"
        class="ui-text"
      >
        <p v-if="props.headline">{{ props.headline }}</p>
        <p v-if="props.description">{{ props.description }}</p>
        <slot name="text"></slot>
      </div>
      <div v-if="slots.end" class="ui-end">
        <slot name="end"></slot>
      </div>
      <slot></slot>
    </label>

    <component :is="Tag" v-else-if="Tag" v-bind="innerAttrs">
      <div v-if="slots.start" class="ui-start">
        <slot name="start"></slot>
      </div>
      <div
        v-if="props.headline || props.description || slots.text"
        class="ui-text"
      >
        <p v-if="props.headline">{{ props.headline }}</p>
        <p v-if="props.description">{{ props.description }}</p>
        <slot name="text"></slot>
        <slot></slot>
      </div>
      <slot v-else></slot>
      <div v-if="slots.end" class="ui-end">
        <slot name="end"></slot>
      </div>
    </component>

    <template v-else>
      <div v-if="slots.start" class="ui-start">
        <slot name="start"></slot>
      </div>
      <div
        v-if="props.headline || props.description || slots.text"
        class="ui-text"
      >
        <p v-if="props.headline">{{ props.headline }}</p>
        <p v-if="props.description">{{ props.description }}</p>
        <slot name="text"></slot>
        <slot></slot>
      </div>
      <slot v-else></slot>
      <div v-if="slots.end" class="ui-end">
        <slot name="end"></slot>
      </div>
    </template>
  </li>
</template>
