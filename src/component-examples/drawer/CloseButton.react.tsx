import {
  Button,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "opui-css/react"

export default function CloseButton() {
  return (
    <>
      <Button
        command="show-modal"
        commandfor="drawer-close-button-1"
        variant="outlined"
      >
        Show filters
      </Button>

      <dialog
        aria-labelledby="drawer-close-button-1-title"
        className="ui-drawer"
        closedby="any"
        id="drawer-close-button-1"
      >
        <DrawerHeader closeButton commandfor="drawer-close-button-1">
          <DrawerTitle id="drawer-close-button-1-title">Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <p>Narrow the list by status, owner and date.</p>
        </DrawerContent>
      </dialog>
    </>
  )
}
