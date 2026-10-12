"use client"

import { useState } from "react"
import {
  Button,
  Dialog,
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
        commandfor="closing-behaviors-dialog"
        command="show-modal"
        variant="outlined"
      >
        Open dialog
      </Button>
      <Dialog
        id="closing-behaviors-dialog"
        closedby={closedby}
        header={<h2 className="ui-h4">How to close</h2>}
        content={
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
