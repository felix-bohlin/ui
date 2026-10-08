<script setup lang="ts">
import { Button, Dialog } from "opui-css/vue"
</script>

<template>
  <Button
    color="critical"
    commandfor="alert-dialog-example"
    command="show-modal"
    variant="outlined"
  >
    Delete project
  </Button>

  <Dialog
    id="alert-dialog-example"
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
      <Button commandfor="alert-dialog-example" command="close" type="button">
        Cancel
      </Button>
      <Button
        color="critical"
        commandfor="alert-dialog-example"
        command="close"
        type="button"
        variant="filled"
      >
        Delete
      </Button>
    </template>
  </Dialog>
</template>
