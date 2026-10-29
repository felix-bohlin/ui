<script setup lang="ts">
import { ColorField } from "opui-css/vue"
</script>

<template>
  <ColorField
    id="color-field-opacity-1"
    label="Overlay"
    value="oklch(0.3 0.05 260 / 0.6)"
  />
  <ColorField
    id="color-field-opacity-2"
    label="Brand color"
    opacity="none"
    value="oklch(0.6 0.15 250)"
  />
</template>
