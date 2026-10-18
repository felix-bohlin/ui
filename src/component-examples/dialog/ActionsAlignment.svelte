<script lang="ts">
  import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader,
  } from "opui-css/svelte"
</script>

<Button
  commandfor="dialog-actions-alignment-1"
  command="show-modal"
  variant="outlined"
>
  Show shortcuts
</Button>

<Dialog id="dialog-actions-alignment-1">
  <DialogHeader>
    <h2 class="ui-h4">Keyboard shortcuts</h2>
  </DialogHeader>
  <DialogContent>
    <p>Press <kbd>?</kbd> anywhere to open this list again.</p>
  </DialogContent>
  <DialogActions align="start">
    <Button
      commandfor="dialog-actions-alignment-1"
      command="close"
      variant="filled"
    >
      Got it
    </Button>
  </DialogActions>
</Dialog>
