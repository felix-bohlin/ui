import { Button, Dialog } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button commandfor="solid-example-dialog" command="show-modal" variant="outlined">Open dialog</Button>
      <Dialog
        id="solid-example-dialog"
        role="alertdialog"
        aria-labelledby="solid-dialog-heading"
        aria-modal="true"
        header={<h2 id="solid-dialog-heading" class="h4">Are you sure?</h2>}
        content={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor r</p>}
        actions={<>
          <Button commandfor="solid-example-dialog" command="close" type="button">Cancel</Button>
          <Button commandfor="solid-example-dialog" command="close" type="button" variant="filled">Save</Button>
        </>}
      />
    </>
  )
}
