<script setup lang="ts">
import type { RadioInputProps } from "./types"

defineOptions({
  inheritAttrs: false,
})

defineProps<RadioInputProps>()
const modelValue = defineModel<string | number | boolean>()
</script>

<template>
  <input type="radio" v-bind="$attrs" v-model="modelValue" />
</template>
