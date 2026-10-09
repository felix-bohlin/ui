<script setup lang="ts">
import { computed } from "vue"
import type { Props, Slots } from "./types.d.vue"

const {
  caption,
  focusable = true,
  format = String,
  label,
  max,
  min,
  rows,
  series,
  size,
} = defineProps<Props>()
defineSlots<Slots>()

const values = computed(() => rows?.flatMap((row) => row.values) ?? [])
const chartMax = computed(
  () =>
    max ?? (values.value.length > 0 ? Math.max(0, ...values.value) : undefined),
)
const chartMin = computed(() => min ?? Math.min(0, ...values.value))
</script>

<template>
  <table
    :class="['ui-bar-chart', size && `ui-${size}`, $props.class]"
    :style="{
      '--max': chartMax,
      '--min': chartMin !== 0 ? chartMin : undefined,
    }"
  >
    <caption v-if="caption">
      {{
        caption
      }}
    </caption>
    <thead v-if="series && series.length > 0">
      <tr>
        <th v-if="label" scope="col">{{ label }}</th>
        <td v-else></td>
        <th v-for="(name, index) in series" :key="index" scope="col">
          {{ name }}
        </th>
      </tr>
    </thead>
    <tbody v-if="rows && rows.length > 0">
      <tr
        v-for="(row, index) in rows"
        :key="index"
        :class="[row.color && `ui-${row.color}`]"
      >
        <th scope="row">{{ row.label }}</th>
        <td
          v-for="(value, valueIndex) in row.values"
          :key="valueIndex"
          :style="`--value: ${value}`"
          :tabindex="focusable ? 0 : undefined"
        >
          {{ format(value) }}
        </td>
      </tr>
    </tbody>
    <slot></slot>
  </table>
</template>
