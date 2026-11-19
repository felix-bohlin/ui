<script setup lang="ts">
import {
  computed,
  inject,
  provide,
  reactive,
  useAttrs,
  useId,
  watchEffect,
} from "vue"
import { TabsKey } from "./context.vue"
import { isSelected } from "../ToggleGroup/selection"
import { warnGroupedChecked } from "../dev"
import { defined } from "../attrs"
import type { TabsItemProps as Props, Slots } from "./types.vue-props"

const { checked = undefined, id, name, value } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const parent = inject(TabsKey, undefined)

const uid = useId()

const groupName = computed(() => name || parent?.groupName || `tabs-${uid}`)

const tabId = computed(() => id || `tab-${uid}`)

const grouped = computed(() => isSelected(parent?.value, value))

watchEffect(() =>
  warnGroupedChecked("TabsItem", grouped.value, checked, "Tabs"),
)

const target = computed({
  get: () => parent?.value,
  set: (next) => {
    if (parent) parent.value = next
  },
})

provide(TabsKey, reactive({ groupName, tabId }))
</script>

<template>
  <input
    v-if="parent?.bound"
    :class="['ui-input', $props.class]"
    :id="tabId"
    :name="groupName"
    type="radio"
    :value="value"
    v-bind="defined(attrs)"
    v-model="target"
  />
  <input
    v-else
    :class="['ui-input', $props.class]"
    :id="tabId"
    :name="groupName"
    type="radio"
    :value="value"
    v-bind="{ ...defined({ checked: grouped ?? checked }), ...defined(attrs) }"
  /><slot></slot>
</template>
