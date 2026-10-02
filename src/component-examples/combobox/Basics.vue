<script setup lang="ts">
import { Combobox } from "opui-css/vue"

const items = [
  { text: "Apple", value: "apple" },
  { text: "Banana", value: "banana" },
  { text: "Cherry", value: "cherry" },
  { text: "Grape", value: "grape" },
  { text: "Mango", value: "mango" },
]
</script>

<template>
  <Combobox
    :items="items"
    label="Fruit"
    name="fruit"
    placeholder="Pick a fruit"
  />
</template>
