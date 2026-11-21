<script setup lang="ts">
import { CharacterCount, Field } from "opui-css/vue"
</script>

<template>
  <Field for="field-top-and-bottom-1" label="Name">
    <input
      aria-describedby="field-top-and-bottom-1-top"
      id="field-top-and-bottom-1"
      placeholder="Holly Humbucker"
    />
    <template #top>Shown on your profile</template>
  </Field>

  <Field for="field-top-and-bottom-2" label="Bass motto">
    <input
      aria-describedby="field-top-and-bottom-2-bottom field-top-and-bottom-2-end-text"
      id="field-top-and-bottom-2"
      maxlength="80"
      placeholder="Turn it up, not down"
    />
    <template #bottom>Plain text, no links</template>
    <template #end-text>
      <CharacterCount />
    </template>
  </Field>
</template>
