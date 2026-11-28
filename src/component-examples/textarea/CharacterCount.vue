<script setup lang="ts">
import { CharacterCount, Field } from "opui-css/vue"
</script>

<template>
  <Field for="textarea-character-count-1" label="Bio">
    <textarea
      aria-describedby="textarea-character-count-1-end-text"
      id="textarea-character-count-1"
      maxlength="160"
    ></textarea>
    <template #end-text>
      Up to 160 characters, shown on your profile.
      <CharacterCount label="{count} characters to go" />
    </template>
  </Field>
</template>
