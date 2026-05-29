<script lang="ts">
  import { Dialog } from "@opui/svelte"
  import { Button } from "@opui/svelte"
</script>

<Button commandfor="example-dialog" command="show-modal" variant="outlined">
  Open dialog
</Button>

<Dialog
  id="example-dialog"
  role="alertdialog"
  aria-labelledby="dialog-heading"
  aria-modal="true"
>
  {#snippet header()}
    <h2 id="dialog-heading" class="ui-h4">Are you sure?</h2>
  {/snippet}
  {#snippet content()}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus.
    </p>
  {/snippet}
  {#snippet actions()}
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
  {/snippet}
</Dialog>
