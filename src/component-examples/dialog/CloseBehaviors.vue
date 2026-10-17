<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/vue"
import { ref } from "vue"

const closedby = ref<"any" | "closerequest" | "none">("any")
</script>

<template>
  <Button
    commandfor="closing-behaviors-dialog"
    command="show-modal"
    variant="outlined"
  >
    Open dialog
  </Button>

  <Dialog id="closing-behaviors-dialog" :closedby="closedby">
    <DialogHeader>
      <h2 class="ui-h4">How to close</h2>
    </DialogHeader>
    <DialogContent>
      <FieldSet>
        <FieldLegend>Choose a closing behavior:</FieldLegend>
        <FieldGroup name="closedby-demo">
          <Radio v-model="closedby" value="any">any</Radio>
          <Radio v-model="closedby" value="closerequest">closerequest</Radio>
          <Radio v-model="closedby" value="none">none</Radio>
        </FieldGroup>
      </FieldSet>
    </DialogContent>
    <DialogActions>
      <Button commandfor="closing-behaviors-dialog" command="close">
        Close manually
      </Button>
    </DialogActions>
  </Dialog>
</template>
