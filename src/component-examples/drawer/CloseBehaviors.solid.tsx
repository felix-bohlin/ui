/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
        commandfor="drawer-close-behaviors-1"
        command="show-modal"
        variant="outlined"
      >
        Open drawer
      </Button>
      <Drawer id="drawer-close-behaviors-1" closedby={closedby()}>
        <DrawerHeader closeButton>
          <DrawerTitle>How to close</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <Fieldset>
            <FieldLegend>Choose a closing behavior:</FieldLegend>
            <FieldGroup>
              {options.map((option) => (
                <Radio
                  checked={closedby() === option}
                  name="closedby-demo"
                  onChange={() => setClosedby(option)}
                  value={option}
                >
                  {option}
                </Radio>
              ))}
            </FieldGroup>
          </Fieldset>
        </DrawerContent>
        <DrawerFooter>
          <Button
            size="small"
            commandfor="drawer-close-behaviors-1"
            command="close"
          >
            Close manually
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
