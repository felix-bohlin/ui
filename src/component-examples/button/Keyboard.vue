<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button aria-keyshortcuts="Control+S"> Save <kbd>Ctrl+S</kbd> </Button>
  <Button aria-keyshortcuts="Control+K" variant="outlined">
    Search <kbd>Ctrl+K</kbd>
  </Button>
  <Button aria-keyshortcuts="Control+Alt+M" variant="tonal">
    Comment <kbd>Ctrl+Alt+M</kbd>
  </Button>
</template>
