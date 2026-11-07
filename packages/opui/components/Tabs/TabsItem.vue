<script setup lang="ts">
import {
  computed,
  type HTMLAttributes,
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
import type { TabsItemProps as Props, Slots } from "./types.vue-props"

const { checked = undefined, id, name, value } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const parent = inject(TabsKey, undefined)

const uid = useId()

const groupName = computed(() => name || parent?.groupName || `tabs-${uid}`)

const tabId = computed(() => id || `tab-${uid}`)

const grouped = computed(() => isSelected(parent?.value, value))

watchEffect(() =>
  warnGroupedChecked("TabsItem", grouped.value, checked, "Tabs"),
)

const change = (event: Event) =>
  parent?.change?.(event.currentTarget as HTMLInputElement)

provide(TabsKey, reactive({ groupName, tabId }))
</script>

<template>
  <input
    :checked="grouped ?? checked"
    :class="['ui-input', $props.class]"
    :id="tabId"
    :name="groupName"
    type="radio"
    :value="value"
    v-bind="attrs"
    @change="change"
  /><slot></slot>
</template>
