<script setup lang="ts">
import "../../elements/reactions.js"
import { computed } from "vue"
import { useRestAttrs, vHydrated } from "../vue"
import ToggleButton from "../ToggleButton/ToggleButton.vue"
import ToggleGroup from "../ToggleGroup/ToggleGroup.vue"
import { pillsOf, usedItem } from "./pills"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { Props, Emits, Slots } from "./types.vue-props"

const { items = [], name, quick } = defineProps<Props>()
defineSlots<Slots>()
const emit = defineEmits<Emits>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs()

const restAttrs = computed(() => {
  const {
    "aria-label": _ariaLabel,
    "aria-labelledby": _ariaLabelledby,
    ...rest
  } = attrs.value
  return rest
})

const used = computed(() => usedItem(items, quick))

const pills = computed(() => pillsOf(items, quick, used.value))
</script>

<template>
  <component
    is="opui-reactions"
    :class="['ui-reactions', $attrs.class]"
    :quick-label="quick?.['aria-label']"
    :quick-text="quick?.label"
    :quick-value="quick?.value"
    v-bind="defined(restAttrs)"
    @reaction="emit('reaction', $event)"
    data-hydrating=""
    v-hydrated
  >
    <ToggleGroup
      :aria-label="attrs['aria-label']"
      :aria-labelledby="attrs['aria-labelledby']"
      multiple
      :name="name"
    >
      <ToggleButton
        v-for="(item, index) in pills"
        :key="index"
        :aria-label="item['aria-label']"
        :checked="!!item.checked"
        v-bind="classAttrs([{ 'ui-suggested': quick && !used && index === 0 }])"
        :value="item.value"
      >
        <span aria-hidden="true">{{ item.label }}</span>
      </ToggleButton> </ToggleGroup
    >{{ " " }}<slot></slot>{{ " "
    }}<span class="ui-sr-only" role="status"></span>
  </component>
</template>
