<script setup lang="ts">
import { ref } from "vue"
import { Button, Textarea } from "opui-css/vue"

const initial = "Thanks for the update."
const message = ref(initial)
</script>

<template>
  <Textarea for="textarea-binding-1" label="Message">
    <textarea
      id="textarea-binding-1"
      name="textarea-binding"
      v-model="message"
    ></textarea>
  </Textarea>
  <p class="textarea-binding-text">{{ message.length }} characters</p>
  <Button class="textarea-binding-reset" @click="message = initial"
    >Reset</Button
  >
</template>
