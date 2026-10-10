<script lang="ts">
  import {
    Button,
    Dialog,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Radio,
  } from "opui-css/svelte"

  let closedby = $state<"any" | "closerequest" | "none">("any")
</script>

<Button
  commandfor="closing-behaviors-dialog"
  command="show-modal"
  variant="outlined"
>
  Open dialog
</Button>

<Dialog id="closing-behaviors-dialog" {closedby}>
  {#snippet header()}<h2 class="ui-h4">How to close</h2>{/snippet}
  {#snippet content()}
    <FieldSet>
      <FieldLegend>Choose a closing behavior:</FieldLegend>
      <FieldGroup name="closedby-demo">
        <Radio bind:group={closedby} value="any">any</Radio>
        <Radio bind:group={closedby} value="closerequest">closerequest</Radio>
        <Radio bind:group={closedby} value="none">none</Radio>
      </FieldGroup>
    </FieldSet>
  {/snippet}
  {#snippet actions()}
    <Button commandfor="closing-behaviors-dialog" command="close">
      Close manually
    </Button>
  {/snippet}
</Dialog>
