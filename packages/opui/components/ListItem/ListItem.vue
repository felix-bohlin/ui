<script setup lang="ts">
import { computed, useAttrs } from "vue"
import type { Props, Slots } from "./types.d.vue"

const {
  as,
  borderTop,
  color,
  description,
  disabled,
  for: htmlFor,
  headline,
  href,
  inset,
  type,
} = defineProps<Props>()
const slots = defineSlots<Slots>()
const attrs = useAttrs()

defineOptions({
  inheritAttrs: false,
})

const hasLabel = computed(
  () => type === "checkbox" || type === "radio" || type === "switch",
)
const Tag = computed(() =>
  hasLabel.value ? "label" : (as ?? (href ? "a" : undefined)),
)

const liAttrs = computed(() => (hasLabel.value || !Tag.value ? attrs : {}))
const tagAttrs = computed(() =>
  hasLabel.value
    ? { class: `ui-${type}`, for: htmlFor }
    : {
        disabled: Tag.value === "button" ? disabled : undefined,
        href,
        type: Tag.value === "button" ? "button" : undefined,
        ...attrs,
      },
)
</script>

<template>
  <li
    :class="[
      {
        'ui-border-top': borderTop,
        'ui-inset': inset,
      },
      color && `ui-${color}`,
      $props.class,
    ]"
    v-bind="liAttrs"
  >
    <component :is="Tag" v-if="Tag" v-bind="tagAttrs">
      <div v-if="slots.start" class="ui-start">
        <slot name="start"></slot>
      </div>
      <div v-if="headline || description || slots.text" class="ui-text">
        <p v-if="headline">{{ headline }}</p>
        <p v-if="description">{{ description }}</p>
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
      <div v-if="headline || description || slots.text" class="ui-text">
        <p v-if="headline">{{ headline }}</p>
        <p v-if="description">{{ description }}</p>
        <slot name="text"></slot>
        <slot></slot>
      </div>
      <slot v-else></slot>
      <div v-if="slots.end" class="ui-end">
        <slot name="end"></slot>
      </div>
    </template>
    <slot name="submenu"></slot>
  </li>
</template>
