<script setup lang="ts">
import { ref } from "vue"
import { Button, ToggleButton, ToggleGroup } from "opui-css/vue"

const view = ref("week")
const format = ref(["bold"])

function reset() {
  view.value = "week"
  format.value = ["bold"]
}
</script>

<template>
  <ToggleGroup
    aria-label="View"
    name="calendar-view"
    selection="single"
    v-model="view"
  >
    <ToggleButton value="day"> Day </ToggleButton>
    <ToggleButton value="week"> Week </ToggleButton>
    <ToggleButton value="month"> Month </ToggleButton>
  </ToggleGroup>
  <ToggleGroup aria-label="Text format" name="text-format" v-model="format">
    <ToggleButton value="bold"> Bold </ToggleButton>
    <ToggleButton value="italic"> Italic </ToggleButton>
    <ToggleButton value="underline"> Underline </ToggleButton>
  </ToggleGroup>
  <p class="toggle-binding-text">
    View: {{ view }}. Format: {{ format.join(", ") || "none" }}.
  </p>
  <Button class="toggle-binding-reset" @click="reset">Reset</Button>
</template>
