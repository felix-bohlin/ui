<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
<Textarea label="Code" placeholder="console.log('Hello, world!')">
  <template #header>script.js</template>
</Textarea>

<Textarea label="Comment" placeholder="Write a comment...">
  <template #footer>0 / 280</template>
</Textarea>
</template>
