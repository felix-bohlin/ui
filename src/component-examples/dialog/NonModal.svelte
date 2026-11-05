<script lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "opui-css/svelte"
</script>

<Button
  id="dialog-non-modal-2"
  onclick={() =>
    document.querySelector<HTMLDialogElement>("#dialog-non-modal-1")?.show()}
  variant="outlined"
>
  Show uploads
</Button>

<Dialog closedby="any" id="dialog-non-modal-1">
  <DialogHeader>
    <DialogTitle>Uploads</DialogTitle>
  </DialogHeader>
  <DialogContent>
    <p>2 of 3 files uploaded. Keep working while the last one finishes.</p>
  </DialogContent>
  <DialogFooter>
    <Button command="close" commandfor="dialog-non-modal-1">Hide</Button>
  </DialogFooter>
</Dialog>
