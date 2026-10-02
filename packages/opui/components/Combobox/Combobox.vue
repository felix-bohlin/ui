<script setup lang="ts">
import { computed, inject, useId, useSlots } from "vue"
import type { Props, Slots } from "./types.d.vue"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: "outlined",
})
defineSlots<Slots>()
const slots = useSlots()
const model = defineModel<string | string[]>()

const labelId = useId()
const listId = computed(() => props.id || `${labelId}-list`)
const endTextId = useId()
const generatedName = useId()
const currentFieldName = inject(CurrentFieldNameKey, undefined)
const fieldName = computed(
  () => props.name || currentFieldName || generatedName,
)
const values = computed(() => [model.value ?? []].flat())
const hasLabel = computed(() => !!(props.label || slots.label))
const hasEndText = computed(() => !!(props.endText || slots["end-text"]))

const select = (event: Event) => {
  const { checked, value } = event.target as HTMLInputElement
  if (!props.multiple) {
    model.value = value
    return
  }
  model.value = checked
    ? [...values.value, value]
    : values.value.filter((item) => item !== value)
}
</script>

<template>
  <div
    :class="[
      'ui-combobox',
      props.size && `ui-${props.size}`,
      {
        'ui-filled': props.variant === 'filled',
        'ui-spread': props.spread,
      },
      props.class,
    ]"
    :data-invalid="props.error ? '' : undefined"
    v-bind="$attrs"
  >
    <span v-if="hasLabel" :id="labelId" class="ui-label">
      <slot name="label">{{ props.label }}</slot>
    </span>

    <span v-if="props.description || $slots.description" class="ui-start-text">
      <slot name="description">{{ props.description }}</slot>
    </span>

    <span class="ui-field">
      <button
        :aria-describedby="hasEndText ? endTextId : undefined"
        :aria-labelledby="hasLabel ? `${labelId} ${listId}` : listId"
        command="toggle-popover"
        :commandfor="listId"
        :disabled="props.disabled"
        type="button"
      >
        <span v-if="props.placeholder" class="ui-placeholder">{{
          props.placeholder
        }}</span>
      </button>
      <div
        :id="listId"
        :aria-labelledby="hasLabel ? labelId : undefined"
        class="ui-list"
        popover=""
        :role="props.multiple ? 'group' : 'radiogroup'"
      >
        <label v-for="item in props.items" :key="item.value">
          <input
            :checked="values.includes(item.value) || undefined"
            :disabled="props.disabled || item.disabled"
            :name="fieldName"
            :required="(!props.multiple && props.required) || undefined"
            :type="props.multiple ? 'checkbox' : 'radio'"
            :value="item.value"
            @change="select"
          />
          {{ item.text }}
        </label>
        <slot></slot>
      </div>
    </span>

    <span v-if="hasEndText" :id="endTextId" class="ui-end-text">
      <slot name="end-text">{{ props.endText }}</slot>
    </span>
  </div>
</template>
