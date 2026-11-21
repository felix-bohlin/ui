<script setup lang="ts">
import { ref } from "vue"
import { Button, Field, SelectButton } from "opui-css/vue"

const fruit = ref("apples")
</script>

<template>
  <Field for="select-binding-1" label="Fruit">
    <select id="select-binding-1" name="select-binding" v-model="fruit">
      <SelectButton />
      <option value="apples">Apples</option>
      <option value="bananas">Bananas</option>
      <option value="cherries">Cherries</option>
    </select>
  </Field>
  <p class="select-binding-text">Selected: {{ fruit }}</p>
  <Button class="select-binding-reset" @click="fruit = 'apples'">Reset</Button>
</template>
