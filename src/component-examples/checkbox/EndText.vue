<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox endText="Wrapped in recycled paper." name="checkbox-end-text">
    Gift wrap
  </Checkbox>
  <Checkbox
    endText="Printed on the packing slip."
    name="checkbox-end-text"
    orientation="vertical"
  >
    Gift message
  </Checkbox>
</template>
