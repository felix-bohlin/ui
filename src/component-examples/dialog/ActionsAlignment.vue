<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
} from "opui-css/vue"
</script>

<template>
  <Button
    commandfor="actions-alignment-example"
    command="show-modal"
    variant="outlined"
  >
    Show shortcuts
  </Button>

  <Dialog id="actions-alignment-example">
    <DialogHeader>
      <h2 class="ui-h4">Keyboard shortcuts</h2>
    </DialogHeader>
    <DialogContent>
      <p>Press <kbd>?</kbd> anywhere to open this list again.</p>
    </DialogContent>
    <DialogActions align="start">
      <Button
        commandfor="actions-alignment-example"
        command="close"
        type="button"
        variant="filled"
      >
        Got it
      </Button>
    </DialogActions>
  </Dialog>
</template>
