<script setup lang="ts">
import { ref } from "vue"
import { Combobox } from "opui-css/vue"

const fruit = ref("mango")
</script>

<template>
  <Combobox
    end-text="Pick one to continue."
    :items="[
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Cherry', value: 'cherry' },
    ]"
    label="Fruit"
    name="validation-required"
    placeholder="Pick a fruit"
    required
  />

  <Combobox
    v-model="fruit"
    end-text="Mango is out of stock."
    error
    :items="[
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Mango', value: 'mango' },
    ]"
    label="Fruit"
    name="validation-error"
  />
</template>
