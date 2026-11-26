<script setup lang="ts">
import { ref } from "vue"
import { Button, TextField } from "opui-css/vue"

const name = ref("Ada")
</script>

<template>
  <TextField label="Name" name="text-field-binding" v-model="name" />
  <p class="text-field-binding-text">Hello, {{ name || "stranger" }}.</p>
  <Button class="text-field-binding-reset" @click="name = 'Ada'">Reset</Button>
</template>
