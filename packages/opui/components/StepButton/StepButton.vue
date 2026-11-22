<script setup lang="ts">
import "../../elements/step-button.js"
import { computed } from "vue"
import { classAttrs } from "../cx"
import type { Props, Slots } from "./types.vue-props"

const { command, for: htmlFor, label } = defineProps<Props>()
defineSlots<Slots>()

const name = computed(
  () => label ?? (command === "--step-down" ? "Decrease" : "Increase"),
)
</script>

<template>
  <component is="opui-step-button" v-bind="classAttrs($props.class)">
    <button
      class="ui-button ui-round"
      type="button"
      :aria-controls="htmlFor"
      :aria-label="name"
      :command="command"
      :commandfor="htmlFor"
    >
      <slot v-if="$slots.default"></slot>
      <svg
        v-else
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      ></svg>
    </button>
  </component>
</template>
