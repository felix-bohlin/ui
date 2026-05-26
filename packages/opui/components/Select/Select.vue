<script setup lang="ts">
import { useId } from "vue"
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: "outlined",
})
defineSlots<Slots>()
const modelValue = defineModel<string | number | (string | number)[]>()

const selectId = props.id || useId()
const labelId = useId()
const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'ui-select',
      props.size && `ui-${props.size}`,
      {
        'ui-filled': props.variant === 'filled',
        'ui-spread': props.spread,
      },
      props.class,
    ]"
    :data-invalid="props.critical || undefined"
  >
    <span v-if="props.label || $slots.label" class="ui-label" :id="labelId">
      <slot name="label">{{ props.label }}</slot>
    </span>

    <span v-if="props.description || $slots.description" class="ui-start-text">
      <slot name="description">{{ props.description }}</slot>
    </span>

    <span class="ui-field">
      <select
        :aria-labelledby="props.label ? labelId : undefined"
        :disabled="props.disabled"
        :id="selectId"
        :name="props.name"
        :required="props.required"
        v-bind="$attrs"
        v-model="modelValue"
      >
        <button v-pre>
          <selectedcontent></selectedcontent>
        </button>
        <div :class="['ui-list', { 'ui-dense': props.dense }]">
          <option
            v-for="item in props.items"
            :key="item.value"
            :value="item.value"
          >
            {{ item.text }}
          </option>
          <slot></slot>
        </div>
      </select>
      <span class="ui-prefix" v-if="$slots.prefix"
        ><slot name="prefix"></slot
      ></span>
      <span class="ui-suffix" v-if="$slots.suffix"
        ><slot name="suffix"></slot
      ></span>
      <span class="ui-header" v-if="$slots.header"
        ><slot name="header"></slot
      ></span>
      <span class="ui-footer" v-if="$slots.footer"
        ><slot name="footer"></slot
      ></span>
    </span>

    <span
      v-if="props.endText || $slots['end-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      <slot name="end-text">{{ props.endText }}</slot>
    </span>
  </label>
</template>
