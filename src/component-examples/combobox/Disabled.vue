<script setup lang="ts">
import { ref } from "vue"
import { Combobox } from "opui-css/vue"

const fruit = ref("banana")
</script>

<template>
  <Combobox
    v-model="fruit"
    disabled
    :items="[
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Cherry', value: 'cherry' },
    ]"
    label="Disabled"
    name="disabled"
  />

  <Combobox
    :items="[
      { text: 'Apple', value: 'apple' },
      { disabled: true, text: 'Banana', value: 'banana' },
      { text: 'Cherry', value: 'cherry' },
    ]"
    label="Disabled option"
    name="disabled-option"
    placeholder="Pick a fruit"
  />
</template>
