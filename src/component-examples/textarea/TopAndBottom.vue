<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea label="Code" placeholder="console.log('Hello, world!')">
    <template #top>script.js</template>
  </Textarea>

  <Textarea
    characterCount
    label="Comment"
    :maxlength="280"
    placeholder="Write a comment..."
  >
    <template #bottom>Markdown supported</template>
  </Textarea>
</template>
