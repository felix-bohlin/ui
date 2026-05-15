<script setup lang="ts">
import { provide, useId } from 'vue'

const props = defineProps<{
  class?: any
  name?: string
}>()

const groupName = props.name || useId()
provide('tabsGroupName', groupName)
</script>

<template>
<div
  :class="['tabs', props.class]"
  role="tablist"
>
  <slot />
</div>
</template>
