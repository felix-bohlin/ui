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
        command="show-modal"
        commandfor="dialog-alert-dialog-1"
        variant="outlined"
      >
        Delete project
      </Button>

      <Dialog
        aria-describedby="dialog-alert-dialog-1-description"
        id="dialog-alert-dialog-1"
        role="alertdialog"
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
          <Button command="close" commandfor="dialog-alert-dialog-1">
            Cancel
          </Button>
          <Button
            color="critical"
            command="close"
            commandfor="dialog-alert-dialog-1"
            variant="filled"
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
