<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField id="number-field-variants-1" label="Outlined" :value="1" />
  <NumberField
    id="number-field-variants-2"
    label="Filled"
    :value="1"
    variant="filled"
  />
</template>
