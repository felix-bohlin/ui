<script setup lang="ts">
import { ColorField } from "opui-css/vue"
</script>

<template>
  <ColorField
    id="color-field-variants-1"
    label="Outlined"
    value="oklch(0.65 0.18 30)"
  />
  <ColorField
    id="color-field-variants-2"
    label="Filled"
    value="oklch(0.65 0.18 30)"
    variant="filled"
  />
</template>
