<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue"
import { TrimmedSlot } from "../whitespace.vue"
import { tagAttrs } from "../tag"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { Props, Slots } from "./types.vue-props"

const {
  as,
  borderTop,
  color,
  description,
  disabled,
  for: htmlFor,
  href,
  inset,
  label,
  type,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const hasControl = computed(
  () => type === "checkbox" || type === "radio" || type === "switch",
)

const Tag = computed(() =>
  hasControl.value ? "label" : (as ?? (href ? "a" : undefined)),
)

const restOnItem = computed(() => hasControl.value || !Tag.value)

const hasLabel = () => !!label || slots.label

const hasDescription = () => !!description || slots.description
</script>

<template>
  <li
    v-bind="{
      ...(restOnItem ? attrs : {}),
      ...classAttrs([
        { 'ui-border-top': borderTop, 'ui-inset': inset },
        color && `ui-${color}`,
        $props.class,
      ]),
    }"
  >
    <component
      :is="Tag"
      v-if="Tag"
      :for="hasControl ? htmlFor : undefined"
      v-bind="{
        ...(hasControl ? {} : tagAttrs(Tag, disabled, href)),
        ...defined(restOnItem ? {} : attrs),
        ...classAttrs([hasControl && `ui-${type}`]),
      }"
      ><div v-if="$slots.start" class="ui-start">
        <slot name="start"></slot>
      </div>
      <div v-if="hasLabel() || hasDescription()" class="ui-text">
        <p v-if="hasLabel()">{{ label }}<slot name="label"></slot></p>
        <p v-if="hasDescription()">
          {{ description }}<slot name="description"></slot>
        </p>
        <slot></slot>
      </div>
      <slot v-else></slot>
      <div v-if="$slots.end" class="ui-end">
        <slot name="end"></slot>
      </div>
      <span
        v-if="$slots['icon-checked']"
        aria-hidden="true"
        class="ui-icon-checked"
        ><slot name="icon-checked"></slot></span
    ></component>
    <template v-else
      ><div v-if="$slots.start" class="ui-start">
        <slot name="start"></slot>
      </div>
      <div v-if="hasLabel() || hasDescription()" class="ui-text">
        <p v-if="hasLabel()">{{ label }}<slot name="label"></slot></p>
        <p v-if="hasDescription()">
          {{ description }}<slot name="description"></slot>
        </p>
        <slot></slot>
      </div>
      <slot v-else></slot>
      <div v-if="$slots.end" class="ui-end">
        <slot name="end"></slot>
      </div>
      <span
        v-if="$slots['icon-checked']"
        aria-hidden="true"
        class="ui-icon-checked"
        ><slot name="icon-checked"></slot></span></template
    ><TrimmedSlot :nodes="$slots.submenu?.()" />
  </li>
</template>
