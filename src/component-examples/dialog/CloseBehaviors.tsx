import { Button, Dialog } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button commandfor="solid-dialog-closedby-any" command="show-modal" variant="outlined">closedby=any</Button>
      <Dialog id="solid-dialog-closedby-any"
        header={<h2 class="h4">closedby=any</h2>}
        content={<p>Click anywhere outside or press Escape to close.</p>}
        actions={<Button commandfor="solid-dialog-closedby-any" command="close" type="button" variant="filled">Close</Button>}
      />
    </>
  )
}
