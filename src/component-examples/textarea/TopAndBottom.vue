<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea label="Code" placeholder="console.log('Hello, world!')">
    <template #top>script.js</template>
  </Textarea>

  <Textarea label="Comment" placeholder="Write a comment...">
    <template #bottom>0 / 280</template>
  </Textarea>
</template>
