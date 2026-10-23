<script lang="ts">
  import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader,
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
    <h2 class="ui-h4">How to close</h2>
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
  <DialogActions>
    <Button commandfor="dialog-close-behaviors-1" command="close">
      Close manually
    </Button>
  </DialogActions>
</Dialog>
