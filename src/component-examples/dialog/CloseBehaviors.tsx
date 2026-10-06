import { createSignal } from "solid-js"
import {
  Button,
  Dialog,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/solid"

export default function Example() {
  const [closedby, setClosedby] = createSignal<"any" | "closerequest" | "none">(
    "any",
  )

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
          <FieldSet>
            <FieldLegend>Choose a closing behavior:</FieldLegend>
            <FieldGroup
              name="closedby-demo"
              onChange={(event) =>
                setClosedby(
                  (event.target as HTMLInputElement).value as ReturnType<
                    typeof closedby
                  >,
                )
              }
            >
              <Radio value="any" checked>
                any
              </Radio>
              <Radio value="closerequest">closerequest</Radio>
              <Radio value="none">none</Radio>
            </FieldGroup>
          </FieldSet>
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
