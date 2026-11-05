<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range label="Volume" spread>
    <template #start-text>Media, calls and alerts.</template>
    <template #end-text>Headphones stay below 85 dB.</template>
  </Range>

  <Range disabled label="Microphone" spread>
    <template #start-text>Set by your organization.</template>
  </Range>

  <Range
    endText="Set it to 20 or more to hear alarms."
    error
    label="Alarm volume"
    spread
    value="10"
  >
    <template #start-text>Rings for alarms and timers.</template>
  </Range>

  <Range
    :items="[
      { value: 0, label: 'Left' },
      { value: 50, label: 'Center' },
      { value: 100, label: 'Right' },
    ]"
    label="Balance"
    spread
  />
</template>
