<script setup lang="ts">
import { ref } from "vue"
import { Button, Select } from "opui-css/vue"

const fruit = ref("apples")
</script>

<template>
  <Select
    label="Fruit"
    name="select-binding"
    :items="[
      { label: 'Apples', value: 'apples' },
      { label: 'Bananas', value: 'bananas' },
      { label: 'Cherries', value: 'cherries' },
    ]"
    v-model="fruit"
  />
  <p class="select-binding-text">Selected: {{ fruit }}</p>
  <Button class="select-binding-reset" @click="fruit = 'apples'">Reset</Button>
</template>
