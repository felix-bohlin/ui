<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "opui-css/vue"

const show = () =>
  document.querySelector<HTMLDialogElement>("#dialog-non-modal-1")?.show()
</script>

<template>
  <Button id="dialog-non-modal-2" variant="outlined" @click="show">
    Show uploads
  </Button>

  <Dialog closedby="any" id="dialog-non-modal-1">
    <DialogHeader>
      <DialogTitle>Uploads</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <p>2 of 3 files uploaded. Keep working while the last one finishes.</p>
    </DialogContent>
    <DialogFooter>
      <Button command="close" commandfor="dialog-non-modal-1">Hide</Button>
    </DialogFooter>
  </Dialog>
</template>
