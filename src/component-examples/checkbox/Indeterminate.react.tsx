"use client"

import { useState } from "react"
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/react"

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
        <Checkbox
          className="parent"
          checked={allChecked}
          onChange={toggleAll}
          indeterminate={indeterminate}
        >
          Select all
        </Checkbox>
      </FieldLegend>
      <FieldGroup name="indeterminate-children">
        {items.map((item, index) => (
          <Checkbox
            className="child"
            key={item}
            checked={checked[index]}
            onChange={(event) =>
              setChecked(checked.with(index, event.currentTarget.checked))
            }
          >
            {item}
          </Checkbox>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}
