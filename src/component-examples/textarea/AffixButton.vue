<script setup lang="ts">
import { Button, Field } from "opui-css/vue"
</script>

<template>
  <Field for="textarea-affix-button-1" label="Message">
    <textarea
      id="textarea-affix-button-1"
      placeholder="Write a message..."
    ></textarea>
    <template #end>
      <Button
        aria-label="Send"
        color="primary"
        round
        type="button"
        variant="filled"
      >
        <svg
          data-icon="send"
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 20v-6l8-2-8-2V4l19 8z"></path>
        </svg>
      </Button>
    </template>
  </Field>
</template>
