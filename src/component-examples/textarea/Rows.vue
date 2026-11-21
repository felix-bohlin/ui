<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="textarea-rows-1" label="Reply">
    <textarea
      id="textarea-rows-1"
      placeholder="Write a reply"
      rows="1"
    ></textarea>
  </Field>
  <Field for="textarea-rows-2" label="Review">
    <textarea
      id="textarea-rows-2"
      placeholder="Write a review"
      rows="6"
    ></textarea>
  </Field>
</template>
