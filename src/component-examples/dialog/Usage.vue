<script setup lang="ts">
import { Button, Dialog } from "opui-css/vue"
</script>

<template>
  <Button commandfor="example-dialog" command="show-modal" variant="outlined">
    Open dialog
  </Button>

  <Dialog
    id="example-dialog"
    role="alertdialog"
    aria-labelledby="dialog-heading"
    aria-modal="true"
  >
    <template #header
      ><h2 id="dialog-heading" class="ui-h4">Are you sure?</h2></template
    >
    <template #content
      ><p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor
        rhoncus.
      </p></template
    >
    <template #actions>
      <Button commandfor="example-dialog" command="close" type="button">
        Cancel
      </Button>
      <Button
        commandfor="example-dialog"
        command="close"
        type="button"
        variant="filled"
      >
        Save
      </Button>
    </template>
  </Dialog>
</template>
