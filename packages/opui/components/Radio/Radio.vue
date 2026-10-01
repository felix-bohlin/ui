<script setup lang="ts">
import RadioInput from "./RadioInput.vue"
import type { RadioProps, Slots } from "./types.d.vue"
import { useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RadioProps>()
defineSlots<Slots>()
const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})

const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'ui-radio',
      props.size && `ui-${props.size}`,
      {
        'ui-stack': props.stack,
      },
      props.class,
    ]"
    :data-invalid="props.error ? '' : undefined"
  >
    <RadioInput
      :aria-invalid="props.error ? 'true' : undefined"
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="
        [$slots['end-text'] ? endTextId : undefined, $attrs['aria-describedby']]
          .filter(Boolean)
          .join(' ') || undefined
      "
    />
    <span :class="[props.hideLabel ? 'ui-sr-only' : 'ui-label']"
      ><slot></slot
    ></span>
    <span :id="endTextId" class="ui-end-text" v-if="$slots['end-text']">
      <slot name="end-text"></slot>
    </span>
  </label>
</template>
