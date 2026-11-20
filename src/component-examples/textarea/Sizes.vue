<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea for="textarea-sizes-1" label="X-small" size="x-small">
    <textarea id="textarea-sizes-1" placeholder="Write a message"></textarea>
  </Textarea>
  <Textarea for="textarea-sizes-2" label="Small" size="small">
    <textarea id="textarea-sizes-2" placeholder="Write a message"></textarea>
  </Textarea>
  <Textarea for="textarea-sizes-3" label="Medium">
    <textarea id="textarea-sizes-3" placeholder="Write a message"></textarea>
  </Textarea>
  <Textarea for="textarea-sizes-4" label="Large" size="large">
    <textarea id="textarea-sizes-4" placeholder="Write a message"></textarea>
  </Textarea>
</template>
