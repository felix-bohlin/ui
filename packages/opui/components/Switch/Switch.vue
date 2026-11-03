<script setup lang="ts">
import { useInputAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import SwitchInput from "./SwitchInput.vue"
import { hasName, warnUnnamed } from "../dev"
import type { Props, Slots } from "./types.vue-props"

const {
  card,
  endText,
  error,
  hideLabel,
  label,
  orientation,
  size,
  spread,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

warnUnnamed("Switch", hasName({ ...attrs.value, label }, slots.default))
</script>

<template>
  <label
    :class="[
      'ui-switch',
      { 'ui-card': card, 'ui-spread': spread },
      card && variant && variant !== 'outlined' && `ui-${variant}`,
      orientation && orientation !== 'horizontal' && `ui-${orientation}`,
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span
      v-if="$slots['icon-unchecked']"
      class="ui-icon-unchecked"
      aria-hidden="true"
      ><slot name="icon-unchecked"></slot></span
    >{{ " "
    }}<span
      v-if="$slots['icon-checked']"
      class="ui-icon-checked"
      aria-hidden="true"
      ><slot name="icon-checked"></slot></span
    >{{ " "
    }}<SwitchInput
      v-bind="attrs"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      v-model="modelValue"
    />{{ " "
    }}<span
      v-if="label || $slots.default"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      >{{ label }}<TrimmedSlot :nodes="$slots.default?.()" /></span
    >{{ " "
    }}<span v-if="endText || $slots['end-text']" class="ui-end-text"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </label>
</template>
