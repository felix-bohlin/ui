<script setup lang="ts">
import { provide, useId } from "vue";
import { type Props, TabsGroupNameKey } from "./types";

const { name } = defineProps<Props>();

defineOptions({
	inheritAttrs: false,
});

const groupName = name || useId();
provide(TabsGroupNameKey, groupName);
</script>

<template>
  <div :class="['tabs', $props.class]" role="tablist" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
