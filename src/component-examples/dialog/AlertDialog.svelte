<script lang="ts">
  import { Button, Dialog } from "opui-css/svelte"
</script>

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
  {#snippet header()}<h2 class="ui-h4">Delete project?</h2>{/snippet}
  {#snippet content()}<p id="alert-dialog-description">
      This deletes the project and all its files. You can't undo this.
    </p>{/snippet}
  {#snippet actions()}
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
  {/snippet}
</Dialog>
