<script setup lang="ts">
import { Button, Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea label="Message" placeholder="Write a message...">
    <template #end>
      <Button
        aria-label="Send"
        color="primary"
        round
        type="button"
        variant="filled"
      >
        <svg
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
  </Textarea>
</template>
