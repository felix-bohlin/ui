<script setup lang="ts">
import RadioInput from "./RadioInput.vue"
import type { RadioProps, Slots } from "./types.d.vue"
import { useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RadioProps>()
defineSlots<Slots>()
const modelValue = defineModel<string | number | boolean>()

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
    :data-invalid="props.error || undefined"
  >
    <RadioInput
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="endTextId"
    />
    <span :class="[props.hideLabel ? 'ui-sr-only' : 'ui-label']"
      ><slot></slot
    ></span>
    <span :id="endTextId" class="ui-end-text" v-if="$slots['end-text']">
      <slot name="end-text"></slot>
    </span>
  </label>
</template>
