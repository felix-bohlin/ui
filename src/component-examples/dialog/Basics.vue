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
  <Button command="show-modal" commandfor="dialog-basics-1" variant="outlined">
    Open dialog
  </Button>

  <Dialog id="dialog-basics-1">
    <DialogHeader>
      <DialogTitle>Newsletter</DialogTitle>
      <Button
        aria-label="Close"
        command="close"
        commandfor="dialog-basics-1"
        round
        size="small"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
          ></path>
        </svg>
      </Button>
      <p>Sent by the product team.</p>
    </DialogHeader>
    <DialogContent>
      <p>
        Get a short email when we ship something new. No more than once a month.
      </p>
    </DialogContent>
    <DialogFooter>
      <Button command="close" commandfor="dialog-basics-1"> Not now </Button>
      <Button command="close" commandfor="dialog-basics-1" variant="filled">
        Subscribe
      </Button>
    </DialogFooter>
  </Dialog>
</template>
