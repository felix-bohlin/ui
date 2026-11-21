<script setup lang="ts">
import { ref } from "vue"
import { Button, TextField } from "opui-css/vue"

const name = ref("Holly")
</script>

<template>
  <TextField for="text-field-binding-1" label="Name">
    <input id="text-field-binding-1" name="text-field-binding" v-model="name" />
  </TextField>
  <p class="text-field-binding-text">Heyyy, {{ name || "stranger" }}.</p>
  <Button class="text-field-binding-reset" @click="name = 'Holly'"
    >Reset</Button
  >
</template>
