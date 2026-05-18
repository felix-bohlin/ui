<script setup lang="ts">
import { useSlots } from "vue";
import type { Props } from "./types";

const { actionsAlign, variant } = defineProps<Props>();

const slots = useSlots();
</script>

<template>
  <div :class="['card', variant, $props.class]">
    <hgroup v-if="slots.header">
      <slot name="header"></slot>
    </hgroup>

    <div v-if="slots.content" class="content">
      <slot name="content"></slot>
    </div>

    <slot></slot>

    <div v-if="slots.actions" :class="['actions', actionsAlign && `align-${actionsAlign}`]">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
