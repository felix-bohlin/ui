import { createSignal } from "solid-js"
import type { JSX } from "@solidjs/web"
import {
  Button,
  Dialog,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/solid"

type ClosedBy = JSX.DialogHtmlAttributes<HTMLDialogElement>["closedby"]

export default function Example() {
  const [closedby, setClosedby] = createSignal<ClosedBy>("any")

  const onChange = (event: Event & { currentTarget: HTMLInputElement }) =>
    setClosedby(event.currentTarget.value as ClosedBy)

  return (
    <>
      <Button
        commandfor="closing-behaviors-dialog"
        command="show-modal"
        variant="outlined"
      >
        Open dialog
      </Button>

      <Dialog
        id="closing-behaviors-dialog"
        closedby={closedby()}
        header={<h2 class="ui-h4">How to close</h2>}
        content={
          <div>
            <FieldSet>
              <FieldLegend>Choose a closing behavior:</FieldLegend>
              <FieldGroup name="closedby-demo">
                <Radio value="any" checked onChange={onChange}>
                  any
                </Radio>
                <Radio value="closerequest" onChange={onChange}>
                  closerequest
                </Radio>
                <Radio value="none" onChange={onChange}>
                  none
                </Radio>
              </FieldGroup>
            </FieldSet>
          </div>
        }
        actions={
          <Button commandfor="closing-behaviors-dialog" command="close">
            Close manually
          </Button>
        }
      />
    </>
  )
}
