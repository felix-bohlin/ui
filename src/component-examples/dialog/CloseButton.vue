<script setup lang="ts">
import { Button, DialogContent, DialogHeader, DialogTitle } from "opui-css/vue"
</script>

<template>
  <Button
    command="show-modal"
    commandfor="dialog-close-button-1"
    variant="outlined"
  >
    Show release notes
  </Button>

  <dialog
    aria-labelledby="dialog-close-button-1-title"
    class="ui-dialog ui-elevated"
    id="dialog-close-button-1"
  >
    <DialogHeader closeButton commandfor="dialog-close-button-1">
      <DialogTitle id="dialog-close-button-1-title">Release notes</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <p>Version 2.4 adds shared folders and a faster search.</p>
    </DialogContent>
  </dialog>
</template>
