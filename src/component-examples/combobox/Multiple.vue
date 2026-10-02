<script setup lang="ts">
import { ref } from "vue"
import { Combobox } from "opui-css/vue"

const items = [
  { text: "Basil", value: "basil" },
  { text: "Mozzarella", value: "mozzarella" },
  { text: "Mushrooms", value: "mushrooms" },
  { text: "Olives", value: "olives" },
  { text: "Pepperoni", value: "pepperoni" },
  { text: "Pineapple", value: "pineapple" },
]
const toppings = ref(["basil", "mozzarella"])
</script>

<template>
  <Combobox
    v-model="toppings"
    :items="items"
    label="Toppings"
    multiple
    name="toppings"
    placeholder="Pick toppings"
  />
</template>
