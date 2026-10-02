<script setup lang="ts">
import { Combobox } from "opui-css/vue"

const items = [
  { text: "Apple", value: "apple" },
  { text: "Banana", value: "banana" },
  { text: "Cherry", value: "cherry" },
]
</script>

<template>
  <Combobox
    :items="items"
    label="Outlined"
    name="variants-outlined"
    placeholder="Pick a fruit"
  />

  <Combobox
    :items="items"
    label="Filled"
    name="variants-filled"
    placeholder="Pick a fruit"
    variant="filled"
  />

  <Combobox
    :items="items"
    label="Small"
    name="variants-small"
    placeholder="Pick a fruit"
    size="small"
  />
</template>
