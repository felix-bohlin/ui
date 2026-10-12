"use client"

import { useState } from "react"
import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/react"

const items = ["Apples", "Bananas", "Cherries"]

export default function Indeterminate() {
  const [checked, setChecked] = useState([true, false, false])

  const allChecked = checked.every(Boolean)
  const someChecked = checked.some(Boolean)
  const indeterminate = someChecked && !allChecked

  function toggleAll() {
    const next = !allChecked
    setChecked(checked.map(() => next))
  }

  return (
    <FieldSet className="indeterminate-demo">
      <FieldLegend>
        <Checkbox className="parent">
          <CheckboxInput
            checked={allChecked}
            onChange={toggleAll}
            indeterminate={indeterminate}
          />
          <CheckboxLabel>Select all</CheckboxLabel>
        </Checkbox>
      </FieldLegend>
      <FieldGroup name="indeterminate-children">
        {items.map((item, index) => (
          <Checkbox className="child" key={item}>
            <CheckboxInput
              checked={checked[index]}
              onChange={(event) =>
                setChecked(checked.with(index, event.currentTarget.checked))
              }
            />
            <CheckboxLabel>{item}</CheckboxLabel>
          </Checkbox>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}
