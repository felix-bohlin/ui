<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea
    characterCount
    characterCountLabel="{count} characters to go"
    endText="Up to 160 characters, shown on your profile."
    for="textarea-character-count-1"
    label="Bio"
  >
    <textarea
      aria-describedby="textarea-character-count-1-end-text"
      id="textarea-character-count-1"
      maxlength="160"
    ></textarea>
  </Textarea>
</template>
