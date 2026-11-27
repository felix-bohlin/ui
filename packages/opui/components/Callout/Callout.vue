<script setup lang="ts">
import "../../elements/callout.js"
import { computed, provide, reactive, useId } from "vue"
import { vHydrated } from "../vue"
import Button from "../Button/Button.vue"
import { CalloutKey } from "./context.vue"
import type { Props, Emits, Slots } from "./types.vue-props"

const {
  closeButton,
  closeLabel = "Close",
  color,
  id,
  severity,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
const emit = defineEmits<Emits>()

const uid = useId()

const base = computed(() => id || `callout-${uid}`)

const Root = computed(() => (closeButton ? "opui-callout" : "div"))

const rootId = computed(() => (closeButton ? base.value : id))

provide(CalloutKey, reactive({ severity: computed(() => severity) }))
</script>

<template>
  <component
    :is="Root"
    :class="[
      'ui-callout',
      color && `ui-${color}`,
      severity && `ui-${severity}`,
      variant && variant !== 'tonal' && `ui-${variant}`,
    ]"
    :id="rootId"
    @dismiss="emit('dismiss', $event)"
    :data-hydrating="Root.includes('-') ? '' : undefined"
    v-hydrated
  >
    <slot></slot
    ><Button
      v-if="closeButton"
      :aria-label="closeLabel"
      command="--dismiss"
      :commandfor="rootId"
      round
      size="small"
      ><slot v-if="$slots['close-icon']" name="close-icon"></slot>
      <svg
        v-else
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      ></svg
    ></Button>
  </component>
</template>
