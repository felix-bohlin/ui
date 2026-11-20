<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea for="textarea-top-and-bottom-1" label="Code">
    <textarea
      aria-describedby="textarea-top-and-bottom-1-top"
      id="textarea-top-and-bottom-1"
      placeholder="console.log('Hello, world!')"
    ></textarea>
    <template #top>script.js</template>
  </Textarea>

  <Textarea characterCount for="textarea-top-and-bottom-2" label="Comment">
    <textarea
      aria-describedby="textarea-top-and-bottom-2-bottom textarea-top-and-bottom-2-end-text"
      id="textarea-top-and-bottom-2"
      maxlength="280"
      placeholder="Write a comment..."
    ></textarea>
    <template #bottom>Markdown supported</template>
  </Textarea>
</template>
