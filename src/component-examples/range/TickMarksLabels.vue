<script setup lang="ts">
import { ref } from "vue"
import { Field } from "opui-css/vue"

const qualities = ["Low", "Medium", "High"]

const opacity = ref(50)
const quality = ref(1)
</script>

<template>
  <Field for="range-tick-marks-labels-1" label="Opacity">
    <input
      :aria-valuetext="`${opacity}%`"
      id="range-tick-marks-labels-1"
      list="range-tick-marks-labels-1-list"
      step="25"
      type="range"
      v-model.number="opacity"
    />
    <datalist aria-hidden="true" id="range-tick-marks-labels-1-list">
      <option label="0%" value="0"></option>
      <option label="25%" value="25"></option>
      <option label="50%" value="50"></option>
      <option label="75%" value="75"></option>
      <option label="100%" value="100"></option>
    </datalist>
  </Field>
  <Field for="range-tick-marks-labels-2" label="Quality">
    <input
      :aria-valuetext="qualities[quality]"
      id="range-tick-marks-labels-2"
      list="range-tick-marks-labels-2-list"
      max="2"
      type="range"
      v-model.number="quality"
    />
    <datalist aria-hidden="true" id="range-tick-marks-labels-2-list">
      <option label="Low" value="0"></option>
      <option label="Medium" value="1"></option>
      <option label="High" value="2"></option>
    </datalist>
  </Field>
</template>
