<script setup lang="ts">
import { provide, useId } from 'vue'
import { TabsGroupNameKey } from './types'

const props = defineProps<{
  class?: any
  name?: string
}>()

const groupName = props.name || useId()
provide(TabsGroupNameKey, groupName)
</script>

<template>
<div
  :class="['tabs', props.class]"
  role="tablist"
>
  <slot />
</div>
</template>
