import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
} from "opui-css/react"

export default function Usage() {
  return (
    <>
      <Button
        commandfor="example-dialog"
        command="show-modal"
        variant="outlined"
      >
        Open dialog
      </Button>

      <Dialog id="example-dialog">
        <DialogHeader>
          <h2 className="ui-h4">Newsletter</h2>
        </DialogHeader>
        <DialogContent>
          <p>
            Get a short email when we ship something new. No more than once a
            month.
          </p>
        </DialogContent>
        <DialogActions>
          <Button commandfor="example-dialog" command="close" type="button">
            Not now
          </Button>
          <Button
            commandfor="example-dialog"
            command="close"
            type="button"
            variant="filled"
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
