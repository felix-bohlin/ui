<script setup lang="ts">
import { Button, Toaster, toast } from "opui-css/vue"
</script>

<template>
  <Button
    id="toast-script-1-button"
    variant="filled"
    @click="toast.success('Changes saved')"
    >Save changes</Button
  >
  <Toaster id="toast-script-1" />
</template>
