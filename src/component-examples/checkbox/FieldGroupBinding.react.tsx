"use client"

import { type ChangeEvent, useState } from "react"
import {
  Button,
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/react"

const topics = ["updates", "events", "offers"]

export default function FieldGroupBinding() {
  const [selected, setSelected] = useState(["updates"])
  const summary =
    topics.filter((topic) => selected.includes(topic)).join(", ") || "none"

  function reset() {
    setSelected(["updates"])
  }

  function toggle(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target
    setSelected((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    )
  }

  return (
    <>
      <Fieldset>
        <FieldLegend>Newsletter topics</FieldLegend>
        <FieldGroup name="checkbox-binding">
          <Checkbox
            checked={selected.includes("updates")}
            onChange={toggle}
            value="updates"
          >
            Bassbook news
          </Checkbox>
          <Checkbox
            checked={selected.includes("events")}
            onChange={toggle}
            value="events"
          >
            Events
          </Checkbox>
          <Checkbox
            checked={selected.includes("offers")}
            onChange={toggle}
            value="offers"
          >
            Gear deals
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <p className="checkbox-binding-text">Selected: {summary}</p>
      <Button className="checkbox-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
