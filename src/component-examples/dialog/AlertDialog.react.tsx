import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "opui-css/react"

export default function AlertDialog() {
  return (
    <>
      <Button
        color="critical"
        commandfor="dialog-alert-dialog-1"
        command="show-modal"
        variant="outlined"
      >
        Delete project
      </Button>
      <Dialog
        id="dialog-alert-dialog-1"
        role="alertdialog"
        aria-describedby="dialog-alert-dialog-1-description"
      >
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p id="dialog-alert-dialog-1-description">
            This deletes the project and all its files. You can't undo this.
          </p>
        </DialogContent>
        <DialogFooter>
          <Button commandfor="dialog-alert-dialog-1" command="close">
            Cancel
          </Button>
          <Button
            color="critical"
            commandfor="dialog-alert-dialog-1"
            command="close"
            variant="filled"
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
