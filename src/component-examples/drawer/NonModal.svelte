<script lang="ts">
  import {
    Button,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    List,
    ListItem,
  } from "opui-css/svelte"
</script>

<Button
  id="drawer-non-modal-2"
  onclick={() =>
    document.querySelector<HTMLDialogElement>("#drawer-non-modal-1")?.show()}
  variant="outlined"
>
  Show folders
</Button>

<Drawer id="drawer-non-modal-1" scrollLock>
  <DrawerHeader closeButton>
    <DrawerTitle>Folders</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <List variant="transparent">
      <ListItem aria-current="page" href="#non-modal" label="Inbox" />
      <ListItem href="#non-modal" label="Drafts" />
      <ListItem href="#non-modal" label="Archive" />
    </List>
  </DrawerContent>
</Drawer>
