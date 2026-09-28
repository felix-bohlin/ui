<script setup vapor lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button
    commandfor="toast-manager"
    command="--show-toast"
    data-title="Default Notification"
  >
    Show Default Toast
  </Button>
</template>
