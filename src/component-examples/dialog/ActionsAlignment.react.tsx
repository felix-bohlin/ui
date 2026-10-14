import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
} from "opui-css/react"

export default function ActionsAlignment() {
  return (
    <>
      <Button
        commandfor="actions-alignment-example"
        command="show-modal"
        variant="outlined"
      >
        Show shortcuts
      </Button>
      <Dialog id="actions-alignment-example">
        <DialogHeader>
          <h2 className="ui-h4">Keyboard shortcuts</h2>
        </DialogHeader>
        <DialogContent>
          <p>
            Press <kbd>?</kbd> anywhere to open this list again.
          </p>
        </DialogContent>
        <DialogActions align="start">
          <Button
            commandfor="actions-alignment-example"
            command="close"
            type="button"
            variant="filled"
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
