"use client"

import { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/react"

const options = ["any", "closerequest", "none"] as const

export default function CloseBehaviors() {
  const [closedby, setClosedby] = useState<(typeof options)[number]>("any")

  return (
    <>
      <Button
        commandfor="dialog-close-behaviors-1"
        command="show-modal"
        variant="outlined"
      >
        Open dialog
      </Button>
      <Dialog id="dialog-close-behaviors-1" closedby={closedby}>
        <DialogHeader>
          <h2 className="ui-h4">How to close</h2>
        </DialogHeader>
        <DialogContent>
          <FieldSet>
            <FieldLegend>Choose a closing behavior:</FieldLegend>
            <FieldGroup name="closedby-demo">
              {options.map((option) => (
                <Radio
                  checked={closedby === option}
                  key={option}
                  onChange={() => setClosedby(option)}
                  value={option}
                >
                  {option}
                </Radio>
              ))}
            </FieldGroup>
          </FieldSet>
        </DialogContent>
        <DialogActions>
          <Button commandfor="dialog-close-behaviors-1" command="close">
            Close manually
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
