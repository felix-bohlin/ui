<script setup lang="ts">
import { ref } from "vue"
import { Button, Textarea } from "opui-css/vue"

const initial = "Thanks for the update."
const message = ref(initial)
</script>

<template>
  <Textarea label="Message" name="textarea-binding" v-model="message" />
  <p class="textarea-binding-text">{{ message.length }} characters</p>
  <Button class="textarea-binding-reset" @click="message = initial"
    >Reset</Button
  >
</template>
