<script setup lang="ts">
import "../../elements/password-toggle.js"
import type { Props, Slots } from "./types.vue-props"

const { for: htmlFor, label = "Show password" } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component is="opui-password-toggle">
    <button
      class="ui-button ui-round"
      type="button"
      :aria-label="label"
      aria-pressed="false"
      command="--toggle-password"
      :commandfor="htmlFor"
    >
      <span
        v-if="$slots['icon-unchecked']"
        aria-hidden="true"
        class="ui-icon-unchecked"
        ><slot name="icon-unchecked"></slot
      ></span>
      <svg
        v-else
        aria-hidden="true"
        class="ui-icon-unchecked"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      ></svg
      >{{ " "
      }}<span
        v-if="$slots['icon-checked']"
        aria-hidden="true"
        class="ui-icon-checked"
        ><slot name="icon-checked"></slot
      ></span>
      <svg
        v-else
        aria-hidden="true"
        class="ui-icon-checked"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      ></svg>
    </button>
  </component>
</template>
