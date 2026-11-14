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

<Button command="show-modal" commandfor="dialog-width-1" variant="outlined">
  Open wide dialog
</Button>

<Dialog id="dialog-width-1" style="--_max-inline-size: 40rem">
  <DialogHeader>
    <DialogTitle>Newsletter</DialogTitle>
  </DialogHeader>
  <DialogContent>
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </DialogContent>
  <DialogFooter>
    <Button command="close" commandfor="dialog-width-1">Not now</Button>
    <Button command="close" commandfor="dialog-width-1" variant="filled">
      Subscribe
    </Button>
  </DialogFooter>
</Dialog>
