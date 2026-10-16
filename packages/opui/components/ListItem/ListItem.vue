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
    props.type === "checkbox" ||
    props.type === "radio" ||
    props.type === "switch",
)
const Tag = computed(() =>
  hasLabel.value ? "label" : (props.as ?? (props.href ? "a" : undefined)),
)

const liAttrs = computed(() => (hasLabel.value || !Tag.value ? attrs : {}))
const tagAttrs = computed(() =>
  hasLabel.value
    ? { class: `ui-${props.type}`, for: props.for }
    : {
        disabled: props.disabled,
        href: props.href,
        type: Tag.value === "button" ? "button" : undefined,
        ...attrs,
      },
)
</script>

<template>
  <li
    :class="[
      {
        'ui-border-top': props.borderTop,
        'ui-critical': props.critical,
        'ui-inset': props.inset,
      },
      props.class,
    ]"
    v-bind="liAttrs"
  >
    <component :is="Tag" v-if="Tag" v-bind="tagAttrs">
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
    <slot name="submenu"></slot>
  </li>
</template>
