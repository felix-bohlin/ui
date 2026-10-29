<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/vue"
import { ref } from "vue"

const closedby = ref<"any" | "closerequest" | "none">("any")
</script>

<template>
  <Button
    commandfor="dialog-close-behaviors-1"
    command="show-modal"
    variant="outlined"
  >
    Open dialog
  </Button>

  <Dialog id="dialog-close-behaviors-1" :closedby="closedby">
    <DialogHeader>
      <DialogTitle>How to close</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <Fieldset>
        <FieldLegend>Choose a closing behavior:</FieldLegend>
        <FieldGroup name="closedby-demo">
          <Radio v-model="closedby" value="any">any</Radio>
          <Radio v-model="closedby" value="closerequest">closerequest</Radio>
          <Radio v-model="closedby" value="none">none</Radio>
        </FieldGroup>
      </Fieldset>
    </DialogContent>
    <DialogFooter>
      <Button commandfor="dialog-close-behaviors-1" command="close">
        Close manually
      </Button>
    </DialogFooter>
  </Dialog>
</template>
