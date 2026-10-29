<script setup lang="ts">
import { Button, Toaster, toast } from "opui-css/vue"

const archive = () =>
  toast("Conversation archived", {
    action: {
      label: "Undo",
      onClick: () => toast("Conversation restored"),
    },
  })
</script>

<template>
  <Button id="toast-action-1-button" variant="filled" @click="archive"
    >Archive</Button
  >
  <Toaster id="toast-action-1" />
</template>
