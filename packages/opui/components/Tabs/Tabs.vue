<script setup lang="ts">
import { provide, useId } from "vue"
import { TabsGroupNameKey, type Props, type Slots } from "./types.d.vue"

const { name } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const uid = useId()
const groupName = name || uid
provide(TabsGroupNameKey, groupName)
</script>

<template>
  <div :class="['ui-tabs', $props.class]" role="tablist" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
