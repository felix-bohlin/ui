<script setup lang="ts">
import { Button, Toaster } from "opui-css/vue"
</script>

<template>
  <Button
    command="--toast"
    commandfor="toast-basics-1"
    data-toast="Changes saved"
    data-toast-severity="success"
    variant="filled"
    >Save changes</Button
  >
  <Toaster id="toast-basics-1" />
</template>
