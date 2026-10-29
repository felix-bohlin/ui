<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField
    id="number-field-stretch-1"
    label="Quantity"
    :max="10"
    :min="1"
    stretch
    :value="1"
  />
</template>
