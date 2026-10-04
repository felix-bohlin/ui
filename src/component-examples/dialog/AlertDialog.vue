<script setup lang="ts">
import { Button, Dialog } from "opui-css/vue"
</script>

<template>
  <Button
    color="critical"
    commandfor="alert-dialog"
    command="show-modal"
    variant="outlined"
  >
    Delete project
  </Button>

  <Dialog
    id="alert-dialog"
    role="alertdialog"
    aria-describedby="alert-dialog-description"
  >
    <template #header><h2 class="ui-h4">Delete project?</h2></template>
    <template #content
      ><p id="alert-dialog-description">
        This deletes the project and all its files. You can't undo this.
      </p></template
    >
    <template #actions>
      <Button commandfor="alert-dialog" command="close" type="button">
        Cancel
      </Button>
      <Button
        color="critical"
        commandfor="alert-dialog"
        command="close"
        type="button"
        variant="filled"
      >
        Delete
      </Button>
    </template>
  </Dialog>
</template>
