"use client"

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  List,
  ListItem,
} from "opui-css/react"

export default function NonModal() {
  return (
    <>
      <Button
        id="drawer-non-modal-2"
        onClick={() =>
          document
            .querySelector<HTMLDialogElement>("#drawer-non-modal-1")
            ?.show()
        }
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
    </>
  )
}
