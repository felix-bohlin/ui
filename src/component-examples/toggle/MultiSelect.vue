<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>

<template>
  <ToggleGroup multiple name="text-style">
    <ToggleButton aria-label="Bold" value="bold"
      ><strong>B</strong></ToggleButton
    >
    <ToggleButton aria-label="Italic" value="italic"><i>I</i></ToggleButton>
    <ToggleButton aria-label="Underline" value="underline"
      ><u>U</u></ToggleButton
    >
  </ToggleGroup>
</template>
