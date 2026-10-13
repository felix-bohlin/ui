<script setup lang="ts">
import CheckboxInput from "./CheckboxInput.vue"
import type { CheckboxProps, Slots } from "./types.d.vue"
import { useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<CheckboxProps>()
defineSlots<Slots>()
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'ui-checkbox',
      props.size && `ui-${props.size}`,
      {
        'ui-stack': props.stack,
        'ui-spread': props.spread,
      },
      props.class,
    ]"
  >
    <CheckboxInput
      :aria-invalid="props.error ? 'true' : undefined"
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="
        [$slots['end-text'] ? endTextId : undefined, $attrs['aria-describedby']]
          .filter(Boolean)
          .join(' ') || undefined
      "
      :indeterminate="props.indeterminate"
    />
    <span
      v-if="$slots.default"
      :class="[props.hideLabel ? 'ui-sr-only' : 'ui-label']"
      ><slot></slot
    ></span>
    <span :id="endTextId" class="ui-end-text" v-if="$slots['end-text']">
      <slot name="end-text"></slot>
    </span>
  </label>
</template>
