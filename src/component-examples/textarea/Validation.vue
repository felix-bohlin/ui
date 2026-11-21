<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Textarea for="textarea-validation-1" label="Message">
      <textarea
        id="textarea-validation-1"
        placeholder="How can we help?"
        required
      ></textarea>
    </Textarea>
    <Textarea
      for="textarea-validation-2"
      label="Delivery instructions"
      variant="filled"
    >
      <textarea
        id="textarea-validation-2"
        placeholder="Gate code, floor, where to leave it"
        required
      ></textarea>
    </Textarea>
  </div>

  <div class="example-row">
    <Textarea
      endText="Write at least 20 characters."
      for="textarea-validation-3"
      label="Review"
    >
      <textarea
        aria-describedby="textarea-validation-3-end-text"
        aria-invalid="true"
        id="textarea-validation-3"
      >
Great</textarea>
    </Textarea>
    <Textarea
      endText="Remove the link. Bios are plain text."
      for="textarea-validation-4"
      label="Bio"
      variant="filled"
    >
      <textarea
        aria-describedby="textarea-validation-4-end-text"
        aria-invalid="true"
        id="textarea-validation-4"
      >
Designer at https://example.com</textarea>
    </Textarea>
  </div>
</template>
