<script setup lang="ts">
import type { SwitchInputProps } from "./types"

defineOptions({
  inheritAttrs: false,
})

defineProps<SwitchInputProps>()
const modelValue = defineModel<boolean | (string | number)[]>()
</script>

<template>
  <input type="checkbox" role="switch" v-bind="$attrs" v-model="modelValue" />
</template>
