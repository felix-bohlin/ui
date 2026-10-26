<script lang="ts">
  import Dialog from "../../../packages/opui/components/Dialog/Dialog.svelte"
  import DialogTitle from "../../../packages/opui/components/Dialog/DialogTitle.svelte"
  import Drawer from "../../../packages/opui/components/Drawer/Drawer.svelte"
  import DrawerTitle from "../../../packages/opui/components/Drawer/DrawerTitle.svelte"

  let { labelledby }: { labelledby?: string } = $props()
</script>

<Dialog aria-labelledby={labelledby}>
  <DialogTitle id="own-dialog-title">Title</DialogTitle>
</Dialog>
<Drawer aria-labelledby={labelledby} id="drawer">
  <DrawerTitle id="own-title">Title</DrawerTitle>
</Drawer>
