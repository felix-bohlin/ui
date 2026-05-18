<script setup lang="ts">
import Anchor from "../Anchor/Anchor.vue";
import type { Props } from "./types";

const { alignment, color, dot, invisible, label } = defineProps<Props>();

const positionArea =
	alignment === "start-start"
		? "start start"
		: alignment === "end-start"
			? "end start"
			: alignment === "end-end"
				? "end end"
				: undefined;
</script>

<template>
  <Anchor
    :alignment="positionArea"
    :class="[
      'badge',
      {
        dot,
        invisible,
      },
      alignment,
      color,
      $props.class,
    ]"
  >
    <slot></slot>
    <template #anchored>
      <span class="badge-indicator" :aria-label="label?.toString()">{{ dot ? '' : label }}</span>
    </template>
  </Anchor>
</template>
