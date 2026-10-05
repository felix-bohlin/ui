<script setup lang="ts">
import { Button, Dialog } from "opui-css/vue"
</script>

<template>
  <Button commandfor="example-dialog" command="show-modal" variant="outlined">
    Open dialog
  </Button>

  <Dialog id="example-dialog">
    <template #header><h2 class="ui-h4">Newsletter</h2></template>
    <template #content
      ><p>
        Get a short email when we ship something new. No more than once a month.
      </p></template
    >
    <template #actions>
      <Button commandfor="example-dialog" command="close" type="button">
        Not now
      </Button>
      <Button
        commandfor="example-dialog"
        command="close"
        type="button"
        variant="filled"
      >
        Subscribe
      </Button>
    </template>
  </Dialog>
</template>
