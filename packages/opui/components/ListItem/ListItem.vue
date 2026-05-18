<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

type Props = {
  as?: 'a' | 'button' | 'div'
  borderTop?: boolean
  class?: string
  description?: string
  for?: string
  headline?: string
  inset?: boolean
  type?: 'checkbox' | 'radio' | 'switch'
}

const props = defineProps<Props>()
const slots = useSlots()
const attrs = useAttrs()

defineOptions({
  inheritAttrs: false,
})

const hasLabel = computed(
  () =>
    props.type &&
    (props.type === 'checkbox' ||
      props.type === 'radio' ||
      props.type === 'switch'),
)
const labelClass = computed(() => props.type || '')
const Tag = computed(() => props.as)

const liAttrs = computed(() => (Tag.value ? {} : attrs))
const innerAttrs = computed(() => (Tag.value ? attrs : {}))
</script>

<template>
  <li
    :class="[
      {
        'border-top': props.borderTop,
        inset: props.inset,
      },
      props.class,
    ]"
    v-bind="liAttrs"
  >
    <label
      v-if="hasLabel"
      :class="labelClass"
      :for="props.for"
    >
      <div v-if="slots.start" class="start">
        <slot name="start"></slot>
      </div>
      <div
        v-if="slots.text || props.headline || props.description"
        class="text"
      >
        <p v-if="props.headline">{{ props.headline }}</p>
        <p v-if="props.description">{{ props.description }}</p>
        <slot name="text"></slot>
      </div>
      <div v-if="slots.end" class="end">
        <slot name="end"></slot>
      </div>
      <slot></slot>
    </label>

    <component
      :is="Tag"
      v-else-if="Tag"
      v-bind="innerAttrs"
    >
      <div v-if="slots.start" class="start">
        <slot name="start"></slot>
      </div>
      <div
        v-if="props.headline || props.description || slots.text"
        class="text"
      >
        <p v-if="props.headline">{{ props.headline }}</p>
        <p v-if="props.description">{{ props.description }}</p>
        <slot name="text"></slot>
        <slot></slot>
      </div>
      <slot v-else></slot>
      <div v-if="slots.end" class="end">
        <slot name="end"></slot>
      </div>
    </component>

    <template v-else>
      <div v-if="slots.start" class="start">
        <slot name="start"></slot>
      </div>
      <div
        v-if="props.headline || props.description || slots.text"
        class="text"
      >
        <p v-if="props.headline">{{ props.headline }}</p>
        <p v-if="props.description">{{ props.description }}</p>
        <slot name="text"></slot>
        <slot></slot>
      </div>
      <slot v-else></slot>
      <div v-if="slots.end" class="end">
        <slot name="end"></slot>
      </div>
    </template>
  </li>
</template>
