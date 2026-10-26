<script lang="ts">
  import Dialog from "../../../packages/opui/components/Dialog/Dialog.svelte"
  import DialogHeader from "../../../packages/opui/components/Dialog/DialogHeader.svelte"
  import Drawer from "../../../packages/opui/components/Drawer/Drawer.svelte"
  import DrawerTitle from "../../../packages/opui/components/Drawer/DrawerTitle.svelte"

  let { labelledby }: { labelledby?: string } = $props()
</script>

<Dialog aria-labelledby={labelledby}>
  <DialogHeader id="own-header">Header</DialogHeader>
</Dialog>
<Drawer aria-labelledby={labelledby} id="drawer">
  <DrawerTitle id="own-title">Title</DrawerTitle>
</Drawer>
