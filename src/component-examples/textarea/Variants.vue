<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea for="textarea-variants-1" label="Outlined">
    <textarea id="textarea-variants-1" placeholder="Write a message"></textarea>
  </Textarea>
  <Textarea for="textarea-variants-2" label="Filled" variant="filled">
    <textarea id="textarea-variants-2" placeholder="Write a message"></textarea>
  </Textarea>
</template>
