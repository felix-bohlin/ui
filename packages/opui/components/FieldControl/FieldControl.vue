<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span :class="['ui-field', props.class]" v-bind="$attrs">
    <slot></slot>
    <span class="ui-prefix" v-if="$slots.prefix"><slot name="prefix"></slot></span>
    <span class="ui-suffix" v-if="$slots.suffix"><slot name="suffix"></slot></span>
    <span class="ui-header" v-if="$slots.header"><slot name="header"></slot></span>
    <span class="ui-footer" v-if="$slots.footer"><slot name="footer"></slot></span>
  </span>
</template>