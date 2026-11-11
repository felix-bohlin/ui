<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Toaster,
} from "opui-css/vue"
</script>

<template>
  <Button command="show-modal" commandfor="toast-dialog-1" variant="outlined">
    Edit profile
  </Button>

  <Dialog id="toast-dialog-1">
    <DialogHeader closeLabel="Close">
      <DialogTitle>Profile</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <p>Your name and photo are shown next to your posts.</p>
    </DialogContent>
    <DialogFooter>
      <Button
        command="--toast"
        commandfor="toast-dialog-2"
        data-toast="Profile saved"
        data-toast-severity="success"
        variant="filled"
      >
        Save
      </Button>
    </DialogFooter>
    <Toaster id="toast-dialog-2" />
  </Dialog>
</template>
