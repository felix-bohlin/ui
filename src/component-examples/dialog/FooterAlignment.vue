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
    commandfor="dialog-footer-alignment-1"
    command="show-modal"
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
        commandfor="dialog-footer-alignment-1"
        command="close"
        variant="filled"
      >
        Got it
      </Button>
    </DialogFooter>
  </Dialog>
</template>
