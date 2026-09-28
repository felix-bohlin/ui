<script setup lang="ts">
import { onMounted } from "vue"
import { initToastManager } from "../../css/js/toast.js"

onMounted(() => {
  initToastManager()
})
</script>

<template>
  <output
    aria-live="polite"
    id="toast-manager"
    popover="manual"
    role="status"
  ></output>
</template>
