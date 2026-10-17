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
  <Button commandfor="dialog-basics-1" command="show-modal" variant="outlined">
    Open dialog
  </Button>

  <Dialog id="dialog-basics-1">
    <DialogHeader>
      <h2 class="ui-h4">Newsletter</h2>
    </DialogHeader>
    <DialogContent>
      <p>
        Get a short email when we ship something new. No more than once a month.
      </p>
    </DialogContent>
    <DialogActions>
      <Button commandfor="dialog-basics-1" command="close"> Not now </Button>
      <Button commandfor="dialog-basics-1" command="close" variant="filled">
        Subscribe
      </Button>
    </DialogActions>
  </Dialog>
</template>
