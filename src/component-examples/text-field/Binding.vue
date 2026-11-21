<script setup lang="ts">
import { ref } from "vue"
import { Button, Field } from "opui-css/vue"

const name = ref("Holly")
</script>

<template>
  <Field for="text-field-binding-1" label="Name">
    <input id="text-field-binding-1" name="text-field-binding" v-model="name" />
  </Field>
  <p class="text-field-binding-text">Heyyy, {{ name || "stranger" }}.</p>
  <Button class="text-field-binding-reset" @click="name = 'Holly'"
    >Reset</Button
  >
</template>
