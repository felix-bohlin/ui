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
    commandfor="dialog-footer-content-1"
    command="show-modal"
    variant="outlined"
  >
    Export data
  </Button>

  <Dialog id="dialog-footer-content-1">
    <DialogHeader>
      <DialogTitle>Export data</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <p>Download your projects, files and comments as one ZIP archive.</p>
    </DialogContent>
    <DialogFooter>
      <p>About 24 MB</p>
      <div class="ui-actions">
        <Button commandfor="dialog-footer-content-1" command="close">
          Cancel
        </Button>
        <Button
          commandfor="dialog-footer-content-1"
          command="close"
          variant="filled"
        >
          Export
        </Button>
      </div>
    </DialogFooter>
  </Dialog>
</template>
