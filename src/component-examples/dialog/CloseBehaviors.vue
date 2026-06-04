<script setup lang="ts">
import {
  Button,
  Dialog,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/vue"
import { onMounted } from "vue"

onMounted(() => {
  const dialog = document.getElementById(
    "closing-behaviors-dialog",
  ) as HTMLDialogElement
  const radios = document.querySelectorAll('input[name="closedby-demo"]')

  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const target = e.target
      if (dialog) {
        dialog.setAttribute("closedby", target.value)
      }
    })
  })
})
</script>

<template>
  <Button
    commandfor="closing-behaviors-dialog"
    command="show-modal"
    variant="outlined"
  >
    Open dialog
  </Button>

  <Dialog id="closing-behaviors-dialog" closedby="any">
    <template #header><h2 class="h4">How to close</h2></template>
    <template #content
      ><div>
        <FieldSet>
          <FieldLegend>Choose a closing behavior:</FieldLegend>
          <FieldGroup name="closedby-demo">
            <Radio value="any" checked>any</Radio>
            <Radio value="closerequest">closerequest</Radio>
            <Radio value="none">none</Radio>
          </FieldGroup>
        </FieldSet>
      </div></template
    >
    <template #actions>
      <Button commandfor="closing-behaviors-dialog" command="close">
        Close manually
      </Button>
    </template>
  </Dialog>
</template>
