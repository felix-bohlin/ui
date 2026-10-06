import { Button, Dialog } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button
        color="critical"
        commandfor="alert-dialog"
        command="show-modal"
        variant="outlined"
      >
        Delete project
      </Button>

      <Dialog
        id="alert-dialog"
        role="alertdialog"
        aria-describedby="alert-dialog-description"
        header={<h2 class="ui-h4">Delete project?</h2>}
        content={
          <p id="alert-dialog-description">
            This deletes the project and all its files. You can't undo this.
          </p>
        }
        actions={
          <>
            <Button commandfor="alert-dialog" command="close" type="button">
              Cancel
            </Button>
            <Button
              color="critical"
              commandfor="alert-dialog"
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
