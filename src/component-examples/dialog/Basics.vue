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
  <Button commandfor="dialog-basics-1" command="show-modal" variant="outlined">
    Open dialog
  </Button>

  <Dialog id="dialog-basics-1">
    <DialogHeader>
      <DialogTitle>Newsletter</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <p>
        Get a short email when we ship something new. No more than once a month.
      </p>
    </DialogContent>
    <DialogFooter>
      <Button commandfor="dialog-basics-1" command="close"> Not now </Button>
      <Button commandfor="dialog-basics-1" command="close" variant="filled">
        Subscribe
      </Button>
    </DialogFooter>
  </Dialog>
</template>
