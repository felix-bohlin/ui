<script setup lang="ts">
import "../../elements/callout.js"
import {
  computed,
  type HTMLAttributes,
  provide,
  reactive,
  useAttrs,
  useId,
} from "vue"
import Button from "../Button/Button.vue"
import { CalloutKey } from "./context.vue"
import { defined } from "../attrs"
import type { Props, Emits, Slots } from "./types.vue-props"

const {
  closeButton,
  closeLabel = "Close",
  id,
  severity,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
const emit = defineEmits<Emits>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const uid = useId()

const base = computed(() => id || `callout-${uid}`)

const Root = computed(() => (closeButton ? "opui-callout" : "article"))

const rootId = computed(() => (closeButton ? base.value : id))

provide(CalloutKey, reactive({ severity: computed(() => severity) }))
</script>

<template>
  <component
    :is="Root"
    :class="[
      'ui-callout',
      severity && `ui-${severity}`,
      variant && variant !== 'tonal' && `ui-${variant}`,
      $props.class,
    ]"
    :id="rootId"
    :role="closeButton ? 'article' : undefined"
    v-bind="defined(attrs)"
    @dismiss="emit('dismiss', $event)"
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
