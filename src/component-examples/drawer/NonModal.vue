<script setup lang="ts">
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  List,
  ListItem,
} from "opui-css/vue"

const show = () =>
  document.querySelector<HTMLDialogElement>("#drawer-non-modal-1")?.show()
</script>

<template>
  <Button id="drawer-non-modal-2" variant="outlined" @click="show">
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
</template>
