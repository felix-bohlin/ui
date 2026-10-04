<script setup lang="ts">
import { computed, provide, useId } from "vue"
import { TabsGroupNameKey, type Props, type Slots } from "./types.d.vue"

const { name, scrollable, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const uid = useId()
const groupName = computed(() => name || uid)
provide(TabsGroupNameKey, groupName)
</script>

<template>
  <div
    :class="[
      'ui-tabs',
      { 'ui-scrollable': scrollable },
      variant && `ui-${variant}`,
      $props.class,
    ]"
    role="tablist"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
