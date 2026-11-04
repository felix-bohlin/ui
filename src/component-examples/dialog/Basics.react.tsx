import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        command="show-modal"
        commandfor="dialog-basics-1"
        variant="outlined"
      >
        Open dialog
      </Button>

      <Dialog id="dialog-basics-1">
        <DialogHeader>
          <DialogTitle>Newsletter</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p>
            Get a short email when we ship something new. No more than once a
            month.
          </p>
        </DialogContent>
        <DialogFooter>
          <Button command="close" commandfor="dialog-basics-1">
            Not now
          </Button>
          <Button command="close" commandfor="dialog-basics-1" variant="filled">
            Subscribe
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
