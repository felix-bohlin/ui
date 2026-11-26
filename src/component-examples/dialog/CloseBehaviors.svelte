<script lang="ts">
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
  } from "opui-css/svelte"

  let closedby = $state<"any" | "closerequest" | "none">("any")
</script>

<Button
  commandfor="dialog-close-behaviors-1"
  command="show-modal"
  variant="outlined"
>
  Open dialog
</Button>

<Dialog id="dialog-close-behaviors-1" {closedby}>
  <DialogHeader>
    <DialogTitle>How to close</DialogTitle>
  </DialogHeader>
  <DialogContent>
    <Fieldset>
      <FieldLegend>Choose a closing behavior:</FieldLegend>
      <FieldGroup name="closedby-demo">
        <Radio bind:group={closedby} value="any">any</Radio>
        <Radio bind:group={closedby} value="closerequest">closerequest</Radio>
        <Radio bind:group={closedby} value="none">none</Radio>
      </FieldGroup>
    </Fieldset>
  </DialogContent>
  <DialogFooter>
    <Button commandfor="dialog-close-behaviors-1" command="close">
      Close manually
    </Button>
  </DialogFooter>
</Dialog>
