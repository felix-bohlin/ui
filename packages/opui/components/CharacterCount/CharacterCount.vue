<script setup lang="ts">
import "../../elements/character-count.js"
import { useRestAttrs } from "../vue"
import { defined } from "../attrs"
import type { Props } from "./types.vue-props"

const { label } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs()
</script>

<template>
  <component
    is="opui-character-count"
    aria-hidden="true"
    :class="['ui-value', $attrs.class]"
    :label="label"
    v-bind="defined(attrs)"
  ></component>
</template>
