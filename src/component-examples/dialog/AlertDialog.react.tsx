import { Button, Dialog } from "opui-css/react"

export default function AlertDialog() {
  return (
    <>
      <Button
        color="critical"
        commandfor="alert-dialog-example"
        command="show-modal"
        variant="outlined"
      >
        Delete project
      </Button>
      <Dialog
        id="alert-dialog-example"
        role="alertdialog"
        aria-describedby="alert-dialog-description"
        header={<h2 className="ui-h4">Delete project?</h2>}
        content={
          <p id="alert-dialog-description">
            This deletes the project and all its files. You can't undo this.
          </p>
        }
        actions={
          <>
            <Button
              commandfor="alert-dialog-example"
              command="close"
              type="button"
            >
              Cancel
            </Button>
            <Button
              color="critical"
              commandfor="alert-dialog-example"
              command="close"
              type="button"
              variant="filled"
            >
              Delete
            </Button>
          </>
        }
      />
    </>
  )
}
