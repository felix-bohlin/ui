<script setup lang="ts">
import type { FieldDescriptionProps } from './types.ts'

const props = defineProps<FieldDescriptionProps>()
</script>

<template>
  <p :class="['field-description', props.class]" v-bind="$attrs"><slot></slot></p>
</template>
