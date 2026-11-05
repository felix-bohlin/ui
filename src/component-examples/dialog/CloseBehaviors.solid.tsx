/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/solid"

const options = ["any", "closerequest", "none"] as const

export default function CloseBehaviors() {
  const [closedby, setClosedby] = createSignal<(typeof options)[number]>("any")

  return (
    <>
      <Button
        commandfor="dialog-close-behaviors-1"
        command="show-modal"
        variant="outlined"
      >
        Open dialog
      </Button>
      <Dialog id="dialog-close-behaviors-1" closedby={closedby()}>
        <DialogHeader>
          <DialogTitle>How to close</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Fieldset>
            <FieldLegend>Choose a closing behavior:</FieldLegend>
            <FieldGroup name="closedby-demo">
              {options.map((option) => (
                <Radio
                  checked={closedby() === option}
                  onChange={() => setClosedby(option)}
                  value={option}
                >
                  {option}
                </Radio>
              ))}
            </FieldGroup>
          </Fieldset>
        </DialogContent>
        <DialogFooter>
          <Button commandfor="dialog-close-behaviors-1" command="close">
            Close manually
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
