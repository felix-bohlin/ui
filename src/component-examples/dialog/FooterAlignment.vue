<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "opui-css/vue"
</script>

<template>
  <Button
    command="show-modal"
    commandfor="dialog-footer-alignment-1"
    variant="outlined"
  >
    Show shortcuts
  </Button>

  <Dialog id="dialog-footer-alignment-1">
    <DialogHeader>
      <DialogTitle>Keyboard shortcuts</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <p>Press <kbd>?</kbd> anywhere to open this list again.</p>
    </DialogContent>
    <DialogFooter align="start">
      <Button
        command="close"
        commandfor="dialog-footer-alignment-1"
        variant="filled"
      >
        Got it
      </Button>
    </DialogFooter>
  </Dialog>
</template>
