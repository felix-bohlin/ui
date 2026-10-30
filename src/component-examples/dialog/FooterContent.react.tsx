import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "opui-css/react"

export default function FooterContent() {
  return (
    <>
      <Button
        command="show-modal"
        commandfor="dialog-footer-content-1"
        variant="outlined"
      >
        Export data
      </Button>

      <Dialog id="dialog-footer-content-1">
        <DialogHeader>
          <DialogTitle>Export data</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p>Download your projects, files and comments as one ZIP archive.</p>
        </DialogContent>
        <DialogFooter>
          <p>About 24 MB</p>
          <div className="ui-actions">
            <Button command="close" commandfor="dialog-footer-content-1">
              Cancel
            </Button>
            <Button
              command="close"
              commandfor="dialog-footer-content-1"
              variant="filled"
            >
              Export
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  )
}
