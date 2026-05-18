<script setup lang="ts">
import { provide, useId } from 'vue'
import { TabsGroupNameKey, type Props } from './types'

const { class: className, name } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const groupName = name || useId()
provide(TabsGroupNameKey, groupName)
</script>

<template>
  <div :class="['tabs', className]" role="tablist" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
