<script setup lang="ts">
import { ref } from "vue"
import { Field } from "opui-css/vue"

const brightness = ref(80)
</script>

<template>
  <Field for="range-value-1" label="Brightness">
    <input
      :aria-valuetext="`${brightness}%`"
      id="range-value-1"
      type="range"
      v-model.number="brightness"
    />
    <template #end-text
      ><output for="range-value-1">{{ brightness }}%</output></template
    >
  </Field>
</template>
